import sql from "sql-bricks-postgres";

import { Id } from "../../model";
import { UserDataItem } from "../model/userData";
import { UserRecentRatingItem } from "../model/userRecentRating";
import { UserRecentRatingRepository } from "../repo/userRecentRating";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  musicId: T.number,
  difficultId: T.number,
  romVersionCode: T.number,
  score: T.number,
});

export class SqlUserRecentRatingRepository
  implements UserRecentRatingRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<UserDataItem>): Promise<UserRecentRatingItem[]> {
    const stmt = sql
      .select("music_id", "difficult_id", "rom_version_code", "score")
      .from("cm_user_recent_rating")
      .where("profile_id", profileId)
      .order("sort_order ASC");

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(
    profileId: Id<UserDataItem>,
    objs: UserRecentRatingItem[]
  ): Promise<void> {
    // Don't do anything if there's nothing to save,
    // since trying to execute an empty insert statement fails.
    if (objs.length === 0) {
      return Promise.resolve();
    }

    const stmt = sql
      .insert(
        "cm_user_recent_rating",
        objs.map((obj, idx) => {
          return {
            id: this._txn.generateId(),
            profile_id: profileId,
            sort_order: idx + 1,
            ...writeRow(obj),
          };
        })
      )
      .onConflict("profile_id", "sort_order")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
