import sql from "sql-bricks-postgres";

import { Car, CarSelector } from "../model/car";
import { Profile } from "../model/profile";
import { CarRepository } from "../repo";
import { Id, Transaction, generateId } from "../../sql";

function _extractRow(row: any): Car {
  return {
    selector: row.selector,
    field_00: row.field_00,
    field_02: row.field_02,
    field_04: row.field_04.split(",").map((x: string) => parseInt(x, 10)),
    field_46: row.field_46,
    field_48: row.field_48,
    field_4a: row.field_4a,
    field_4c: row.field_4c,
    field_50_lo: row.field_50_lo,
    field_50_hi: row.field_50_hi,
    field_58: row.field_58,
    field_5a: row.field_5a,
    field_5b: row.field_5b,
    field_5c: row.field_5c,
    field_5e: row.field_5e,
  };
}

export class SqlCarRepository implements CarRepository {
  constructor(private readonly _txn: Transaction) {}

  async countCars(profileId: Id<Profile>): Promise<number> {
    const countSql = sql
      .select("count(*) result")
      .from("idz_car c")
      .where("c.profile_id", profileId);

    const row = await this._txn.fetchRow(countSql);

    return parseInt(row!.result, 10);
  }

  async loadAllCars(profileId: Id<Profile>): Promise<Car[]> {
    const loadSql = sql
      .select("c.*")
      .from("idz_car c")
      .where("c.profile_id", profileId);

    const rows = await this._txn.fetchRows(loadSql);

    return rows.map(_extractRow);
  }

  async loadSelectedCar(profileId: Id<Profile>): Promise<Car> {
    const loadSql = sql
      .select("c.*")
      .from("idz_car c")
      .join("idz_car_selection s", { "c.id": "s.car_id" })
      .where("s.id", profileId);

    const row = await this._txn.fetchRow(loadSql);

    return _extractRow(row);
  }

  async saveCar(profileId: Id<Profile>, car: Car): Promise<void> {
    const saveSql = sql
      .insert("idz_car", {
        id: generateId(),
        profile_id: profileId,
        selector: car.selector,
        field_00: car.field_00,
        field_02: car.field_02,
        field_04: car.field_04.join(","),
        field_46: car.field_46,
        field_48: car.field_48,
        field_4a: car.field_4a,
        field_4c: car.field_4c,
        field_50_lo: car.field_50_lo,
        field_50_hi: car.field_50_hi,
        field_58: car.field_58,
        field_5a: car.field_5a,
        field_5b: car.field_5b,
        field_5c: car.field_5c,
        field_5e: car.field_5e,
      })
      .onConflict("profile_id", "selector")
      .doUpdate([
        "field_00",
        "field_02",
        "field_04",
        "field_46",
        "field_48",
        "field_4a",
        "field_4c",
        "field_50_lo",
        "field_50_hi",
        "field_58",
        "field_5a",
        "field_5b",
        "field_5c",
        "field_5e",
      ]);

    await this._txn.modify(saveSql);
  }

  async saveSelection(
    profileId: Id<Profile>,
    selector: CarSelector
  ): Promise<void> {
    const findSql = sql
      .select("c.id")
      .from("idz_car c")
      .where("c.profile_id", profileId)
      .where("c.selector", selector);

    const row = await this._txn.fetchRow(findSql);

    if (row === undefined) {
      throw new Error("Selected car not found");
    }

    const saveSql = sql
      .insert("idz_car_selection", {
        id: profileId,
        car_id: row.id,
      })
      .onConflict("id")
      .doUpdate(["car_id"]);

    await this._txn.modify(saveSql);
  }
}
