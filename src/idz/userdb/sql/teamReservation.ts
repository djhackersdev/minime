import sql from "sql-bricks-postgres";

import { Team } from "../model/team";
import { TeamReservationRepository } from "../repo";
import { AimeId, Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlTeamReservationRepository
  implements TeamReservationRepository {
  constructor(private readonly _txn: Transaction) {}

  private async _lockTeam(teamId: Id<Team>): Promise<void> {
    const lockSql = sql
      .select("t.id")
      .from("idz_team t")
      .where("t.id", teamId)
      .forUpdate();

    await this._txn.fetchRow(lockSql);
  }

  async occupancyHack(teamId: Id<Team>): Promise<number> {
    await this._lockTeam(teamId);

    const memberSql = sql
      .select("count(*) as count")
      .from("idz_team_member tm")
      .where("tm.team_id", teamId);

    const memberRes = await this._txn.fetchRow(memberSql);
    const memberCount = parseInt(memberRes!.count!);

    const reservSql = sql
      .select("count(*) as count")
      .from("idz_team_reservation tr")
      .where("tr.team_id", teamId);

    const reservRes = await this._txn.fetchRow(reservSql);
    const reservCount = parseInt(reservRes!.count!);

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
      .where("r.ext_id", aimeId);

    const row = await this._txn.fetchRow(lookupSql);

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
      .doUpdate(["team_id"]);

    await this._txn.modify(insertSql);
  }

  async commitHack(aimeId: AimeId): Promise<void> {
    const lookupSql = sql
      .select("p.id as profile_id", "tr.*")
      .from("idz_profile p")
      .join("aime_player r", { "p.player_id": "r.id" })
      .join("idz_team_reservation tr", { "r.id": "tr.id" })
      .where("r.ext_id", aimeId);

    const row = await this._txn.fetchRow(lookupSql);

    if (row === undefined) {
      throw new Error(`Reservation not found for Aime ID ${aimeId}`);
    }

    const insertSql = sql.insert("idz_team_member", {
      id: row.profile_id,
      team_id: row.team_id,
      join_time: row.join_time,
      leader: row.leader,
    });

    await this._txn.modify(insertSql);

    const cleanupSql = sql.delete("idz_team_reservation").where("id", row.id);

    await this._txn.modify(cleanupSql);
  }
}
