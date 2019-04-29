import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { _findProfile } from "./_util";
import { CourseNo, ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { CoursePlaysRepository } from "../repo";
import { generateId } from "../../db";

export class SqlCoursePlaysRepository implements CoursePlaysRepository {
  constructor(private readonly _conn: ClientBase) {}

  async loadAll(extId: ExtId<Profile>): Promise<Map<CourseNo, number>> {
    const loadSql = sql
      .select("cp.course_no", "cp.count")
      .from("idz.course_plays cp")
      .join("idz.profile p", { "cp.profile_id": "p.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const result = new Map();

    for (const row of rows) {
      result.set(row.course_no, row.count);
    }

    return result;
  }

  async saveAll(
    extId: ExtId<Profile>,
    plays: Map<CourseNo, number>
  ): Promise<void> {
    const profileId = await _findProfile(this._conn, extId);

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
