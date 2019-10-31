import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserItemItem } from "../model/userItem";
import { Page } from "../repo";
import { UserItemRepository } from "../repo/userItem";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  itemKind: T.number,
  itemId: T.number,
  stock: T.number,
  isValid: T.boolean,
});

export class SqlUserItemRepository implements UserItemRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    itemKind: number,
    page?: Page
  ): Promise<UserItemItem[]> {
    const stmt = sql
      .select("*")
      .from("cm_user_item")
      .where("profile_id", profileId)
      .where("item_kind", itemKind);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserItemItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_item", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "item_kind", "item_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
