import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserMusicDetailItem } from "../model/userMusic";
import { Page } from "../repo";
import { UserMusicRepository } from "../repo/userMusic";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  musicId: T.number,
  level: T.number,
  playCount: T.number,
  scoreMax: T.number,
  resRequestCount: T.number,
  resAcceptCount: T.number,
  resSuccessCount: T.number,
  missCount: T.number,
  maxComboCount: T.number,
  isFullCombo: T.boolean,
  isAllJustice: T.boolean,
  isSuccess: T.boolean,
  fullChain: T.number,
  maxChain: T.number,
  scoreRank: T.number,
  isLock: T.boolean,
});

export class SqlUserMusicRepository implements UserMusicRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page
  ): Promise<UserMusicDetailItem[]> {
    const preStmt = sql
      .select("DISTINCT(music_id)")
      .from("cm_user_music")
      .where("profile_id", profileId)
      .orderBy("music_id");
    if (page) {
      preStmt.limit(page.limit).offset(page.offset);
    }
    const preRows = await this._txn.fetchRows(preStmt);
    const musicIds = preRows.map(r => r.music_id);

    const stmt = sql
      .select("*")
      .from("cm_user_music")
      .where("profile_id", profileId)
      .and(sql.in('music_id', musicIds));

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserMusicDetailItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_music", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "music_id", "level")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
