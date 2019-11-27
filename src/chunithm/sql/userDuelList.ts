import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserDuelListItem } from "../model/userDuelList";
import { Page } from "../repo";
import { UserDuelListRepository } from "../repo/userDuelList";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  duelId: T.number,
  progress: T.number,
  point: T.number,
  isClear: T.boolean,
  lastPlayDate: T.Date,
  param1: T.number,
  param2: T.number,
  param3: T.number,
  param4: T.number,
});

export class SqlUserDuelListRepository implements UserDuelListRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    duelId?: number
  ): Promise<UserDuelListItem[]> {
    const stmt = sql
      .select("*")
      .from("cm_user_duel_list")
      .where("profile_id", profileId);

    if (duelId !== undefined) {
      stmt.where("duel_id", duelId);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserDuelListItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_duel_list", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "duel_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
