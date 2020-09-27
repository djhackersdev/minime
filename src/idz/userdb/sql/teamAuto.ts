import sql from "sql-bricks-postgres";

import { Team, TeamAuto } from "../model/team";
import { TeamAutoRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlTeamAutoRepository implements TeamAutoRepository {
  constructor(private readonly _txn: Transaction) {}

  async peek(version: number): Promise<[TeamAuto, Id<Team>] | undefined> {
    const peekSql = sql
      .select("tt.*")
      .from("idz_team_auto tt")
      .join("idz_team t", { "tt.id": "t.id" })
      .where("t.version", version)
      .orderBy("serial_no desc", "name_idx desc")
      .limit(1);

    const row = await this._txn.fetchRow(peekSql);

    return (
      row && [
        {
          serialNo: parseInt(row.serial_no!),
          nameIdx: parseInt(row.name_idx!),
        },
        row.id as Id<Team>,
      ]
    );
  }

  async push(teamId: Id<Team>, auto: TeamAuto): Promise<void> {
    const pushSql = sql.insert("idz_team_auto", {
      id: teamId,
      serial_no: auto.serialNo,
      name_idx: auto.nameIdx,
    });

    await this._txn.modify(pushSql);
  }
}
