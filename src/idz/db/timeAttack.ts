import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { RouteNo } from "../model/base";
import { Profile } from "../model/profile";
import { TimeAttackScore } from "../model/timeAttack";
import { TimeAttackRepository, TopTenResult } from "../repo";
import { generateId, Id } from "../../db";

export class SqlTimeAttackRepository implements TimeAttackRepository {
  constructor(private readonly _conn: ClientBase) {}

  async loadTopTen(
    routeNo: RouteNo,
    minTimestamp: Date
  ): Promise<TopTenResult[]> {
    const loadSql = sql
      .select("p.name", "ta.*")
      .from("idz.ta_best ta")
      .join("idz.profile p", { "ta.profile_id": "p.id" })
      .where("ta.route_no", routeNo)
      .where(sql.gt("ta.timestamp", minTimestamp))
      .orderBy(["ta.total_time asc", "ta.timestamp asc"])
      .limit(10)
      .toParams();

    const { rows } = await this._conn.query(loadSql);

    return rows.map(row => ({
      driverName: row.name,
      ta: {
        routeNo: row.route_no,
        timestamp: new Date(row.timestamp),
        flags: row.flags,
        totalTime: row.total_time,
        sectionTimes: row.section_times,
        grade: row.grade,
        carSelector: row.car_selector,
      },
    }));
  }

  async loadAll(profileId: Id<Profile>): Promise<TimeAttackScore[]> {
    const loadSql = sql
      .select("ta.*")
      .from("idz.ta_best ta")
      .where("ta.profile_id", profileId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);

    return rows.map(row => ({
      routeNo: row.route_no,
      timestamp: new Date(row.timestamp),
      flags: row.flags,
      totalTime: row.total_time,
      sectionTimes: row.section_times,
      grade: row.grade,
      carSelector: row.car_selector,
    }));
  }

  async save(profileId: Id<Profile>, score: TimeAttackScore): Promise<void> {
    const logSql = sql
      .insert("idz.ta_result", {
        id: generateId(),
        profile_id: profileId,
        route_no: score.routeNo,
        total_time: score.totalTime,
        section_times: score.sectionTimes,
        flags: score.flags,
        grade: score.grade,
        car_selector: score.carSelector,
        timestamp: score.timestamp,
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
          car_selector: score.carSelector,
          timestamp: score.timestamp,
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
          car_selector: score.carSelector,
          timestamp: score.timestamp,
        })
        .where("profile_id", profileId)
        .where("route_no", score.routeNo)
        .toParams();

      await this._conn.query(updateSql);
    }
  }
}
