import sql from "sql-bricks-postgres";

import { UserActivityItem } from "../model/userActivity";
import { UserDataItem } from "../model/userData";
import { UserActivityRepository } from "../repo/userActivity";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  kind: T.number,
  activityId: T.number, // This is just called "id" on the wire
  sortNumber: T.number,
  param1: T.number,
  param2: T.number,
  param3: T.number,
  param4: T.number,
});

export class SqlUserActivityRepository implements UserActivityRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    kind: number
  ): Promise<UserActivityItem[]> {
    const stmt = sql
      .select("*")
      .from("cm_user_activity")
      .where("profile_id", profileId)
      .where("kind", kind)
      .orderBy("sort_number DESC")
      .limit(100);

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserActivityItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_activity", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "kind", "activity_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
