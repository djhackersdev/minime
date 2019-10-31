import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserDataExItem } from "../model/userDataEx";
import { UserDataExRepository } from "../repo/userDataEx";
import { AimeId, Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  compatibleCmVersion: T.string,
  medal: T.number,
  mapIconId: T.number,
  voiceId: T.number,
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
  extStr1: T.string,
  extStr2: T.string,
  extStr3: T.string,
  extStr4: T.string,
  extStr5: T.string,
  extLong1: T.bigint,
  extLong2: T.bigint,
  extLong3: T.bigint,
  extLong4: T.bigint,
  extLong5: T.bigint,
});

export class SqlUserDataExRepository implements UserDataExRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(dataId: Id<UserDataItem>): Promise<UserDataExItem> {
    const stmt = sql
      .select("*")
      .from("cm_user_data_ex")
      .where("id", dataId);

    const row = await this._txn.fetchRow(stmt);

    if (row === undefined) {
      throw new Error("UserDataEx record not found");
    }

    return readRow(row);
  }

  async save(profileId: Id<UserDataItem>, obj: UserDataExItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_data_ex", {
        id: profileId,
        ...writeRow(obj),
      })
      .onConflict("id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
