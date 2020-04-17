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
      /**
       * When upgrading from CHUNITHM Star Plus & earlier
       * to Amazon, there is no UserDataEx, so we return
       * a "default" row.
       */
      return {
        compatibleCmVersion: "",
        medal: 0,
        mapIconId: 0,
        voiceId: 0,
        ext1: 0,
        ext2: 0,
        ext3: 0,
        ext4: 0,
        ext5: 0,
        ext6: 0,
        ext7: 0,
        ext8: 0,
        ext9: 0,
        ext10: 0,
        ext11: 0,
        ext12: 0,
        ext13: 0,
        ext14: 0,
        ext15: 0,
        ext16: 0,
        ext17: 0,
        ext18: 0,
        ext19: 0,
        ext20: 0,
        extStr1: "",
        extStr2: "",
        extStr3: "",
        extStr4: "",
        extStr5: "",
        extLong1: 0n,
        extLong2: 0n,
        extLong3: 0n,
        extLong4: 0n,
        extLong5: 0n,
      };
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
