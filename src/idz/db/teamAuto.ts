import * as sql from "sql-bricks-postgres";
import { ClientBase } from "pg";

import { Team, TeamAuto } from "../model/team";
import { TeamAutoRepository } from "../repo";
import { Id } from "../../db";

export class SqlTeamAutoRepository implements TeamAutoRepository {
  constructor(private readonly _conn: ClientBase) {}

  async peek(): Promise<[TeamAuto, Id<Team>] | undefined> {
    const peekSql = sql
      .select("tt.*")
      .from("idz_team_auto tt")
      .orderBy("serial_no desc", "name_idx desc")
      .limit(1)
      .toParams();

    const { rows } = await this._conn.query(peekSql);
    const row = rows[0];

    return (
      row && [
        {
          serialNo: row.serial_no,
          nameIdx: row.name_idx,
        },
        row.id,
      ]
    );
  }

  async push(teamId: Id<Team>, auto: TeamAuto): Promise<void> {
    const pushSql = sql
      .insert("idz_team_auto", {
        id: teamId,
        serial_no: auto.serialNo,
        name_idx: auto.nameIdx,
      })
      .toParams();

    await this._conn.query(pushSql);
  }
}
