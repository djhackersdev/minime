import sql from "sql-bricks-postgres";

import { RouteNo } from "../model/base";
import { CarSelector } from "../model/car";
import { Profile } from "../model/profile";
import { TimeAttackScore } from "../model/timeAttack";
import { TimeAttackRepository, TopTenResult } from "../repo";
import { Id, Row, Transaction, generateId } from "../../sql";

function _extractRow(row: Row): TimeAttackScore {
  return {
    routeNo: parseInt(row.route_no) as RouteNo,
    timestamp: new Date(row.timestamp),
    flags: parseInt(row.flags),
    totalTime: parseFloat(row.total_time),
    sectionTimes: row.section_times.split(",").map(parseFloat),
    grade: parseInt(row.grade),
    carSelector: parseInt(row.car_selector) as CarSelector,
  };
}

export class SqlTimeAttackRepository implements TimeAttackRepository {
  constructor(private readonly _txn: Transaction) {}

  async loadTopTen(
    routeNo: RouteNo,
    minTimestamp: Date
  ): Promise<TopTenResult[]> {
    const loadSql = sql
      .select("p.name", "ta.*")
      .from("idz_ta_best ta")
      .join("idz_profile p", { "ta.profile_id": "p.id" })
      .where("ta.route_no", routeNo)
      .where(sql.gt("ta.timestamp", minTimestamp))
      .orderBy(["ta.total_time asc", "ta.timestamp asc"])
      .limit(10);

    const rows = await this._txn.fetchRows(loadSql);

    return rows.map(row => ({
      driverName: row.name,
      ta: _extractRow(row),
    }));
  }

  async loadAll(profileId: Id<Profile>): Promise<TimeAttackScore[]> {
    const loadSql = sql
      .select("ta.*")
      .from("idz_ta_best ta")
      .where("ta.profile_id", profileId);

    const rows = await this._txn.fetchRows(loadSql);

    return rows.map(_extractRow);
  }

  async save(profileId: Id<Profile>, score: TimeAttackScore): Promise<void> {
    const logSql = sql.insert("idz_ta_result", {
      id: generateId(),
      profile_id: profileId,
      route_no: score.routeNo,
      total_time: score.totalTime,
      section_times: score.sectionTimes.join(","),
      flags: score.flags,
      grade: score.grade,
      car_selector: score.carSelector,
      timestamp: score.timestamp,
    });

    await this._txn.modify(logSql);

    const existSql = sql
      .select("ta.total_time")
      .from("idz_ta_best ta")
      .where("ta.profile_id", profileId)
      .where("ta.route_no", score.routeNo);

    const row = await this._txn.fetchRow(existSql);

    if (row === undefined) {
      const insertSql = sql.insert("idz_ta_best", {
        id: generateId(),
        profile_id: profileId,
        route_no: score.routeNo,
        total_time: score.totalTime,
        section_times: score.sectionTimes.join(","),
        flags: score.flags,
        grade: score.grade,
        car_selector: score.carSelector,
        timestamp: score.timestamp,
      });

      await this._txn.modify(insertSql);
    } else {
      if (score.totalTime < parseFloat(row.total_time)) {
        const updateSql = sql
          .update("idz_ta_best", {
            total_time: score.totalTime,
            section_times: score.sectionTimes.join(","),
            flags: score.flags,
            grade: score.grade,
            car_selector: score.carSelector,
            timestamp: score.timestamp,
          })
          .where("profile_id", profileId)
          .where("route_no", score.routeNo);

        await this._txn.modify(updateSql);
      }
    }
  }
}
