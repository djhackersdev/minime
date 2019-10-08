import sql from "sql-bricks-postgres";
import { ClientBase } from "pg";

import { Profile } from "../model/profile";
import { Team, TeamMember } from "../model/team";
import { TeamMemberRepository } from "../repo";
import { Id, generateId } from "../../db";
import { _extractProfile } from "./profile";
import { _extractChara } from "./chara";

export class SqlTeamMemberRepository implements TeamMemberRepository {
  constructor(private readonly _conn: ClientBase) {}

  async findTeam(profileId: Id<Profile>): Promise<Id<Team> | undefined> {
    const findSql = sql
      .select("tm.team_id")
      .from("idz_team_member tm")
      .where("tm.id", profileId)
      .toParams();

    const { rows } = await this._conn.query(findSql);
    const row = rows[0];

    if (row === undefined) {
      return undefined;
    }

    return row.team_id;
  }

  async findLeader(teamId: Id<Team>): Promise<Id<Profile> | undefined> {
    const findSql = sql
      .select("tm.id")
      .from("idz_team_member tm")
      .where("tm.team_id", teamId)
      .where("tm.leader", true)
      .toParams();

    const { rows } = await this._conn.query(findSql);
    const row = rows[0];

    if (row === undefined) {
      return undefined;
    }

    return row.id;
  }

  async loadRoster(teamId: Id<Team>): Promise<TeamMember[]> {
    const loadSql = sql
      .select("tm.*", "p.*", "c.*", "r.ext_id as aime_id")
      .from("idz_team_member tm")
      .join("idz_profile p", { "tm.id": "p.id" })
      .join("idz_chara c", { "tm.id": "c.id" })
      .join("aime_player r", { "p.player_id": "r.id" })
      .where("tm.team_id", teamId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);

    return rows.map((row: any) => ({
      profile: _extractProfile(row),
      chara: _extractChara(row),
      leader: row.leader,
      joinTime: new Date(row.join_time),
    }));
  }

  async join(
    teamId: Id<Team>,
    profileId: Id<Profile>,
    timestamp: Date
  ): Promise<void> {
    // Lock the team record to avoid race conditions. This way

    const lockSql = sql
      .select("id")
      .from("idz_team")
      .where("id", teamId)
      .forUpdate()
      .toParams();

    await this._conn.query(lockSql);

    // Double-check (with lock held) that there is room to join this team.
    // If this fails then the error will propagate to the client and it will
    // retry, and, assuming we have a race between two new registrations to
    // take up the last slot in the current auto-team, hopefully succeed.
    //
    // There is arguably some business logic pollution here, since we have a
    // hard-coded maximum team size imposed by the protocol. This is why a
    // three-layered server would be better than our two-layered server.

    const countSql = sql
      .select("count(*) as count")
      .from("idz_team_member")
      .where("team_id", teamId)
      .toParams();

    const { rows } = await this._conn.query(countSql);
    const row = rows[0];

    if (row.count >= 6) {
      throw new Error(`Team ${teamId} is full`);
    }

    // Do upsert

    const joinSql = sql
      .insert("idz_team_member", {
        id: profileId,
        team_id: teamId,
        leader: false,
        join_time: timestamp,
      })
      .onConflict("id")
      .doUpdate(["team_id", "leader", "join_time"])
      .toParams();

    await this._conn.query(joinSql);
  }

  async leave(teamId: Id<Team>, profileId: Id<Profile>): Promise<void> {
    const leaveSql = sql
      .delete("idz_team_member")
      .where("team_id", teamId)
      .where("id", profileId)
      .toParams();

    await this._conn.query(leaveSql);
  }

  async makeLeader(teamId: Id<Team>, profileId: Id<Profile>): Promise<void> {
    const clearSql = sql
      .update("idz_team_member", {
        leader: false,
      })
      .where("team_id", teamId)
      .toParams();

    await this._conn.query(clearSql);

    const setSql = sql
      .update("idz_team_member", {
        leader: true,
      })
      .where("id", profileId)
      .where("team_id", teamId)
      .toParams();

    await this._conn.query(setSql);
  }
}
