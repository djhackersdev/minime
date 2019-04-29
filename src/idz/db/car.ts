import { Client } from "pg";
import * as sql from "sql-bricks-postgres";

import { _findProfile } from "./_util";
import { ExtId } from "../model/base";
import { Car, CarSelector } from "../model/car";
import { Profile } from "../model/profile";
import { CarRepository } from "../repo";
import { generateId } from "../../db";

function _extractRow(row: any): Car {
  return {
    selector: row.selector,
    field_00: row.field_00,
    field_02: row.field_02,
    field_04: row.field_04,
    field_46: row.field_46,
    field_48: row.field_48,
    field_4A: row.field_4A,
    field_4C: row.field_4C,
    field_50_lo: row.field_50_lo,
    field_50_hi: row.field_50_hi,
    field_58: row.field_58,
    field_5A: row.field_5A,
    field_5B: row.field_5B,
    field_5C: row.field_5C,
    field_5E: row.field_5E,
  };
}

export class SqlCarRepository implements CarRepository {
  constructor(private readonly _conn: Client) {}

  async countCars(extId: ExtId<Profile>): Promise<number> {
    const countSql = sql
      .select("count(*) result")
      .from("idz.car c")
      .join("idz.profile p", { "c.profile_id": "p.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(countSql);
    const row = rows[0];

    return parseInt(row.result, 10);
  }

  async loadAllCars(extId: ExtId<Profile>): Promise<Car[]> {
    const loadSql = sql
      .select("c.*")
      .from("idz.car c")
      .join("idz.profile p", { "c.profile_id": "p.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);

    return rows.map(_extractRow);
  }

  async loadSelectedCar(extId: ExtId<Profile>): Promise<Car> {
    const loadSql = sql
      .select("c.*")
      .from("idz.car c")
      .join("idz.car_selection s", { "c.id": "s.car_id" })
      .join("idz.profile p", { "s.id": "p.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);

    return _extractRow(rows[0]);
  }

  async saveCar(extId: ExtId<Profile>, car: Car): Promise<void> {
    const saveSql = sql
      .insert("idz.car", {
        id: generateId(),
        profile_id: await _findProfile(this._conn, extId),
        selector: car.selector,
        field_00: car.field_00,
        field_02: car.field_02,
        field_04: car.field_04,
        field_46: car.field_46,
        field_48: car.field_48,
        field_4A: car.field_4A,
        field_4C: car.field_4C,
        field_50_lo: car.field_50_lo,
        field_50_hi: car.field_50_hi,
        field_58: car.field_58,
        field_5A: car.field_5A,
        field_5B: car.field_5B,
        field_5C: car.field_5C,
        field_5E: car.field_5E,
      })
      .onConflict("profile_id", "selector")
      .doUpdate(
        "field_00",
        "field_02",
        "field_04",
        "field_46",
        "field_48",
        "field_4A",
        "field_4C",
        "field_50_lo",
        "field_50_hi",
        "field_58",
        "field_5A",
        "field_5B",
        "field_5C",
        "field_5E"
      )
      .toParams();

    await this._conn.query(saveSql);
  }

  async saveSelection(
    extId: ExtId<Profile>,
    selector: CarSelector
  ): Promise<void> {
    const profileId = await _findProfile(this._conn, extId);

    const findSql = sql
      .select("c.id")
      .from("idz.car c")
      .where("c.profile_id", profileId)
      .where("c.selector", selector)
      .toParams();

    const { rows } = await this._conn.query(findSql);
    const row = rows[0];

    if (row === undefined) {
      throw new Error("Selected car not found");
    }

    const saveSql = sql
      .insert("idz.car", {
        id: profileId,
        car_id: row.id,
      })
      .onConflict("id")
      .doUpdate("car_id")
      .toParams();

    await this._conn.query(saveSql);
  }
}
