import sql from "sql-bricks-postgres";

import { ExtId, RouteNo } from "../model/base";
import { CarSelector } from "../model/car";
import { Team } from "../model/team";
import { Profile } from "../model/profile";
import { TimeAttackScore } from "../model/timeAttack";
import { TimeAttackRepository, TopTenResult } from "../repo";
import { Id } from "../../../model";
import { Row, Transaction } from "../../../sql";

function _extractRow(row: Row): TimeAttackScore {
  return {
    routeNo: parseInt(row.route_no!) as RouteNo,
    timestamp: new Date(row.timestamp!),
    flags: parseInt(row.flags!),
    totalTime: parseFloat(row.total_time!),
    sectionTimes: row.section_times!.split(",").map(parseFloat),
    grade: parseInt(row.grade!),
    carSelector: parseInt(row.car_selector!) as CarSelector,
  };
}

export class SqlTimeAttackRepository implements TimeAttackRepository {
  constructor(private readonly _txn: Transaction) {}

  async loadTop(
    version: number,
    routeNo: RouteNo,
    minTimestamp: Date,
    limit: number
  ): Promise<TopTenResult[]> {
    // We're not using an ORM here so this join-heavy SQL is unfortunately
    // going to be a boilerplated mess.

    const loadSql = sql
      .select(
        // Profile
        "p.name as profile_name",
        // Team
        "t.version as team_version",
        "t.ext_id as team_ext_id",
        "t.name as team_name",
        "t.name_bg as team_name_bg",
        "t.name_fx as team_name_fx",
        "t.register_time as team_register_time",
        // Time Attack
        "ta.*"
      )
      .from("idz_ta_best ta")
      .join("idz_profile p", { "ta.profile_id": "p.id" })
      // This is an inner join, so it will exclude anybody who is not currently
      // a member of a team from the leader boards. Since the only way to play
      // without a team is to be ejected from one we can consider this an edge
      // case that we probably don't need to worry about.
      .join("idz_team_member tm", { "ta.profile_id": "tm.id" })
      .join("idz_team t", { "tm.team_id": "t.id" })
      .where("p.version", version)
      .where("ta.route_no", routeNo)
      .where(sql.gt("ta.timestamp", minTimestamp))
      .orderBy(["ta.total_time asc", "ta.timestamp asc"])
      .limit(limit);

    const rows = await this._txn.fetchRows(loadSql);

    return rows.map(row => ({
      driverName: row.profile_name!,
      team: {
        extId: parseInt(row.team_ext_id!) as ExtId<Team>,
        version: parseInt(row.team_version!),
        name: row.team_name!,
        nameBg: parseInt(row.team_name_bg!),
        nameFx: parseInt(row.team_name_fx!),
        registerTime: new Date(row.team_register_time!),
      },
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
      id: this._txn.generateId(),
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
        id: this._txn.generateId(),
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
      if (score.totalTime < parseFloat(row.total_time!)) {
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
