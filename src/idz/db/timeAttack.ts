import { ClientBase } from "pg";
import * as sql from "sql-bricks";

import { _findProfile } from "./_util";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { TimeAttackScore } from "../model/timeAttack";
import { TimeAttackRepository } from "../repo";
import { generateId } from "../../db";

export class SqlTimeAttackRepository implements TimeAttackRepository {
  constructor(private readonly _conn: ClientBase) {}

  async loadAll(extId: ExtId<Profile>): Promise<TimeAttackScore[]> {
    const loadSql = sql
      .select("ta.*")
      .from("idz.time_attack ta")
      .join("idz.profile p", { "ta.profile_id": "p.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);

    return rows.map(row => ({
      routeNo: row.route_no,
      timestamp: new Date(row.timestamp),
      flags: row.flags,
      totalTime: row.total_time,
      sectionTimes: row.section_times,
      grade: row.grade,
    }));
  }

  async save(extId: ExtId<Profile>, score: TimeAttackScore): Promise<void> {
    const profileId = await _findProfile(this._conn, extId);

    const logSql = sql
      .insert("idz.ta_result", {
        id: generateId(),
        profile_id: profileId,
        route_no: score.routeNo,
        total_time: score.totalTime,
        section_times: score.sectionTimes,
        flags: score.flags,
        grade: score.grade,
      })
      .toParams();

    await this._conn.query(logSql);

    const existSql = sql
      .select("ta.total_time")
      .from("idz.ta_best ta")
      .where("ta.profile_id", profileId)
      .where("ta.route_no", score.routeNo)
      .toParams();

    const { rows } = await this._conn.query(existSql);
    const row = rows[0];

    if (row === undefined) {
      const insertSql = sql
        .insert("idz.ta_best", {
          id: generateId(),
          profile_id: profileId,
          route_no: score.routeNo,
          total_time: score.totalTime,
          section_times: score.sectionTimes,
          flags: score.flags,
          grade: score.grade,
        })
        .toParams();

      await this._conn.query(insertSql);
    } else if (score.totalTime < row.total_time) {
      const updateSql = sql
        .update("idz.ta_best", {
          total_time: score.totalTime,
          section_times: score.sectionTimes,
          flags: score.flags,
          grade: score.grade,
        })
        .where("profile_id", profileId)
        .where("route_no", score.routeNo)
        .toParams();

      await this._conn.query(updateSql);
    }
  }
}
