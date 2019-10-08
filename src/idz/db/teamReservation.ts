import * as sql from "sql-bricks-postgres";
import { ClientBase } from "pg";

import { Team } from "../model/team";
import { TeamReservationRepository } from "../repo";
import { Id } from "../../db";
import { AimeId } from "../../model";

export class SqlTeamReservationRepository
  implements TeamReservationRepository {
  constructor(private readonly _conn: ClientBase) {}

  private async _lockTeam(teamId: Id<Team>): Promise<void> {
    const lockSql = sql
      .select("t.id")
      .from("idz_team t")
      .where("t.id", teamId)
      .forUpdate()
      .toParams();

    await this._conn.query(lockSql);
  }

  async occupancyHack(teamId: Id<Team>): Promise<number> {
    await this._lockTeam(teamId);

    // counts get returned as strings, so 1 + 0 = 10.
    // it hardly needs to be said but fuck javascript.

    const memberSql = sql
      .select("count(*) as count")
      .from("idz_team_member tm")
      .where("tm.team_id", teamId)
      .toParams();

    const memberRes = await this._conn.query(memberSql);
    const memberCount = parseInt(memberRes.rows[0].count, 10);

    const reservSql = sql
      .select("count(*) as count")
      .from("idz_team_reservation tr")
      .where("tr.team_id", teamId)
      .toParams();

    const reservRes = await this._conn.query(reservSql);
    const reservCount = parseInt(reservRes.rows[0].count, 10);

    return memberCount + reservCount;
  }

  async reserveHack(
    teamId: Id<Team>,
    aimeId: AimeId,
    timestamp: Date,
    leader?: "leader"
  ): Promise<void> {
    const lookupSql = sql
      .select("r.id")
      .from("aime_player r")
      .where("r.ext_id", aimeId)
      .toParams();

    const { rows } = await this._conn.query(lookupSql);
    const row = rows[0];

    if (row === undefined) {
      throw new Error(`Unknown Aime ID ${aimeId}`);
    }

    const playerId = row.id;

    const insertSql = sql
      .insert("idz_team_reservation", {
        id: playerId,
        team_id: teamId,
        join_time: timestamp,
        leader: leader === "leader",
      })
      .onConflict("id")
      .doUpdate(["team_id"])
      .toParams();

    await this._conn.query(insertSql);
  }

  async commitHack(aimeId: AimeId): Promise<void> {
    const lookupSql = sql
      .select("p.id as profile_id", "tr.*")
      .from("idz_profile p")
      .join("aime_player r", { "p.player_id": "r.id" })
      .join("idz_team_reservation tr", { "r.id": "tr.id" })
      .where("r.ext_id", aimeId)
      .toParams();

    const { rows } = await this._conn.query(lookupSql);
    const row = rows[0];

    if (row === undefined) {
      throw new Error(`Reservation not found for Aime ID ${aimeId}`);
    }

    const insertSql = sql
      .insert("idz_team_member", {
        id: row.profile_id,
        team_id: row.team_id,
        join_time: row.join_time,
        leader: row.leader,
      })
      .toParams();

    await this._conn.query(insertSql);

    const cleanupSql = sql
      .delete("idz_team_reservation")
      .where("id", row.id)
      .toParams();

    await this._conn.query(cleanupSql);
  }
}
