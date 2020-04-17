import sql from "sql-bricks-postgres";
import { createSqlMapper, T } from "../../sql/util";
import { UserCourseRepository } from "../repo/userCourse";
import { Id } from "../../model";
import { Page } from "../repo";
import { UserDataItem } from "../model/userData";
import { UserCourseItem } from "../model/userCourse";
import { Transaction } from "../../sql";

const { readRow, writeRow, colNames } = createSqlMapper({
  courseId: T.number,
  classId: T.number,
  playCount: T.number,
  scoreMax: T.number,
  isFullCombo: T.boolean,
  isAllJustice: T.boolean,
  isSuccess: T.boolean,
  scoreRank: T.number,
  eventId: T.number,
  lastPlayDate: T.Date,
  param1: T.number,
  param2: T.number,
  param3: T.number,
  param4: T.number,
  isClear: T.boolean
});

export class SqlUserCourseRepository implements UserCourseRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page
  ): Promise<UserCourseItem[]> {
    const stmt = sql
      .select("*")
      .from("cm_user_course")
      .where("profile_id", profileId);

    /**
     * UserCourse has no paging before CHUNITHM Amazon
     */
    if (page && !isNaN(page.limit)) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserCourseItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_course", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "course_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }

}
