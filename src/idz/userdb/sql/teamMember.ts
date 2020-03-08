import sql from "sql-bricks-postgres";

import { Profile } from "../model/profile";
import { Team, TeamMember } from "../model/team";
import { TeamMemberRepository } from "../repo";
import { _extractProfile } from "./profile";
import { _extractChara } from "./chara";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlTeamMemberRepository implements TeamMemberRepository {
  constructor(private readonly _txn: Transaction) {}

  async findTeam(profileId: Id<Profile>): Promise<Id<Team> | undefined> {
    const findSql = sql
      .select("tm.team_id")
      .from("idz_team_member tm")
      .where("tm.id", profileId);

    const row = await this._txn.fetchRow(findSql);

    if (row === undefined) {
      return undefined;
    }

    return row.team_id as Id<Team>;
  }

  async findLeader(teamId: Id<Team>): Promise<Id<Profile> | undefined> {
    const findSql = sql
      .select("tm.id")
      .from("idz_team_member tm")
      .where("tm.team_id", teamId)
      .where("tm.leader", true);

    const row = await this._txn.fetchRow(findSql);

    if (row === undefined) {
      return undefined;
    }

    return row.id as Id<Profile>;
  }

  async loadRoster(teamId: Id<Team>): Promise<TeamMember[]> {
    const loadSql = sql
      .select("tm.*", "p.*", "c.*", "r.ext_id as aime_id")
      .from("idz_team_member tm")
      .join("idz_profile p", { "tm.id": "p.id" })
      .join("idz_chara c", { "tm.id": "c.id" })
      .join("aime_player r", { "p.player_id": "r.id" })
      .where("tm.team_id", teamId);

    const rows = await this._txn.fetchRows(loadSql);

    return rows.map(row => ({
      profile: _extractProfile(row),
      chara: _extractChara(row),
      leader: row.leader === "true",
      joinTime: new Date(row.join_time!),
    }));
  }

  async join(
    teamId: Id<Team>,
    profileId: Id<Profile>,
    timestamp: Date
  ): Promise<void> {
    // Lock the team record to avoid race conditions.

    const lockSql = sql
      .select("id")
      .from("idz_team")
      .where("id", teamId)
      .forUpdate();

    await this._txn.fetchRow(lockSql);

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
      .where("team_id", teamId);

    const row = await this._txn.fetchRow(countSql);

    if (parseInt(row!.count!) >= 6) {
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
      .doUpdate(["team_id", "leader", "join_time"]);

    await this._txn.modify(joinSql);
  }

  async leave(teamId: Id<Team>, profileId: Id<Profile>): Promise<void> {
    const leaveSql = sql
      .delete("idz_team_member")
      .where("team_id", teamId)
      .where("id", profileId);

    await this._txn.modify(leaveSql);
  }

  async makeLeader(teamId: Id<Team>, profileId: Id<Profile>): Promise<void> {
    const clearSql = sql
      .update("idz_team_member", {
        leader: false,
      })
      .where("team_id", teamId);

    await this._txn.modify(clearSql);

    const setSql = sql
      .update("idz_team_member", {
        leader: true,
      })
      .where("id", profileId)
      .where("team_id", teamId);

    await this._txn.modify(setSql);
  }
}
