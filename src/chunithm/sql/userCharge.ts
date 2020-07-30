import sql from "sql-bricks-postgres";
import { createSqlMapper, T } from "../../sql/util";
import { UserChargeRepository } from "../repo/userCharge";
import { Id } from "../../model";
import { Page } from "../repo";
import { UserDataItem } from "../model/userData";
import { UserChargeItem } from "../model/userCharge";
import { Transaction } from "../../sql";

const { readRow, writeRow, colNames } = createSqlMapper({
  chargeId: T.number,
  stock: T.number,
  purchaseDate: T.Date,
  validDate: T.Date,
  param1: T.number,
  param2: T.number,
  paramDate: T.Date,
});

export class SqlUserChargeRepository implements UserChargeRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<UserDataItem>): Promise<UserChargeItem[]> {
    const stmt = sql
      .select("*")
      .from("cm_user_charge")
      .where("profile_id", profileId);

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserChargeItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_charge", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "charge_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }

}
