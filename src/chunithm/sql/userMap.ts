import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserMapItem } from "../model/userMap";
import { Page } from "../repo";
import { UserMapRepository } from "../repo/userMap";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  mapId: T.number,
  position: T.number,
  isClear: T.boolean,
  areaId: T.number,
  routeNumber: T.number,
  eventId: T.number,
  rate: T.number,
  statusCount: T.number,
  isValid: T.boolean,
});

export class SqlUserMapRepository implements UserMapRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page
  ): Promise<UserMapItem[]> {
    const stmt = sql
      .select("*")
      .from("cm_user_map")
      .where("profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserMapItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_map", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "map_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
