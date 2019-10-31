import sql from "sql-bricks-postgres";

import { UserCharacterItem } from "../model/userCharacter";
import { UserDataItem } from "../model/userData";
import { Page } from "../repo";
import { UserCharacterRepository } from "../repo/userCharacter";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  characterId: T.number,
  playCount: T.number,
  level: T.number,
  skillId: T.number,
  friendshipExp: T.number,
  isValid: T.boolean,
  isNewMark: T.boolean,
  param1: T.number,
  param2: T.number,
});

export class SqlUserCharacterRepository implements UserCharacterRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserCharacterItem[]> {
    const stmt = sql
      .select("c.*")
      .from("cm_user_character c")
      .where("c.profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  async loadOne(
    profileId: Id<UserDataItem>,
    characterId: number
  ): Promise<UserCharacterItem> {
    const stmt = sql
      .select("c.*")
      .from("cm_user_character c")
      .where("c.profile_id", profileId)
      .where("c.character_id", characterId);

    const row = await this._txn.fetchRow(stmt);

    if (row === undefined) {
      throw new Error("Database corrupted: selected character not found");
    }

    return readRow(row);
  }

  save(profileId: Id<UserDataItem>, obj: UserCharacterItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_character", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "character_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
