import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserGameOptionExItem } from "../model/userGameOptionEx";
import { UserGameOptionExRepository } from "../repo/userGameOptionEx";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  ext1: T.number,
  ext2: T.number,
  ext3: T.number,
  ext4: T.number,
  ext5: T.number,
  ext6: T.number,
  ext7: T.number,
  ext8: T.number,
  ext9: T.number,
  ext10: T.number,
  ext11: T.number,
  ext12: T.number,
  ext13: T.number,
  ext14: T.number,
  ext15: T.number,
  ext16: T.number,
  ext17: T.number,
  ext18: T.number,
  ext19: T.number,
  ext20: T.number,
});

export class SqlUserGameOptionExRepository
  implements UserGameOptionExRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(dataId: Id<UserDataItem>): Promise<UserGameOptionExItem> {
    const stmt = sql
      .select("*")
      .from("cm_user_game_option_ex")
      .where("id", dataId);

    const row = await this._txn.fetchRow(stmt);

    if (row === undefined) {
      throw new Error("UserGameOptionEx record not found");
    }

    return readRow(row);
  }

  save(profileId: Id<UserDataItem>, obj: UserGameOptionExItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_game_option_ex", {
        id: profileId,
        ...writeRow(obj),
      })
      .onConflict("id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
