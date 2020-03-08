import sql from "sql-bricks-postgres";

import { CourseNo } from "../model/base";
import { Profile } from "../model/profile";
import { CoursePlaysRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlCoursePlaysRepository implements CoursePlaysRepository {
  constructor(private readonly _txn: Transaction) {}

  async loadAll(profileId: Id<Profile>): Promise<Map<CourseNo, number>> {
    const loadSql = sql
      .select("cp.course_no", "cp.count")
      .from("idz_course_plays cp")
      .where("cp.profile_id", profileId);

    const rows = await this._txn.fetchRows(loadSql);
    const result = new Map<CourseNo, number>();

    for (const row of rows) {
      const courseNo = parseInt(row.course_no!) as CourseNo;
      const count = parseInt(row.count!);

      result.set(courseNo, count);
    }

    return result;
  }

  async saveAll(
    profileId: Id<Profile>,
    plays: Map<CourseNo, number>
  ): Promise<void> {
    for (const [k, v] of plays) {
      const saveSql = sql
        .insert("idz_course_plays", {
          id: this._txn.generateId(),
          profile_id: profileId,
          course_no: k,
          count: v,
        })
        .onConflict("profile_id", "course_no")
        .doUpdate(["count"]);

      await this._txn.modify(saveSql);
    }
  }
}
