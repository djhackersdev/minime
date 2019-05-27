import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { CourseNo, ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { CoursePlaysRepository } from "../repo";
import { generateId, Id } from "../../db";

export class SqlCoursePlaysRepository implements CoursePlaysRepository {
  constructor(private readonly _conn: ClientBase) {}

  async loadAll(profileId: Id<Profile>): Promise<Map<CourseNo, number>> {
    const loadSql = sql
      .select("cp.course_no", "cp.count")
      .from("idz.course_plays cp")
      .where("cp.profile_id", profileId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const result = new Map();

    for (const row of rows) {
      result.set(row.course_no, row.count);
    }

    return result;
  }

  async saveAll(
    profileId: Id<Profile>,
    plays: Map<CourseNo, number>
  ): Promise<void> {
    for (const [k, v] of plays) {
      const saveSql = sql
        .insert("idz.course_plays", {
          id: generateId(),
          profile_id: profileId,
          course_no: k,
          count: v,
        })
        .onConflict("profile_id", "course_no")
        .doUpdate(["count"])
        .toParams();

      await this._conn.query(saveSql);
    }
  }
}
