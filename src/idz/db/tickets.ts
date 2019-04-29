import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { _findProfile } from "./_util";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Tickets } from "../model/tickets";
import { FacetRepository } from "../repo";

// TODO free continue

export class SqlTicketsRepository implements FacetRepository<Tickets> {
  constructor(private readonly _conn: ClientBase) {}

  async load(extId: ExtId<Profile>): Promise<Tickets> {
    const loadSql = sql
      .select("fc.*")
      .from("idz.profile p")
      .join("idz.free_car fc", { "p.id": "fc.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const row = rows[0];

    return {
      freeCar: row && {
        validFrom: new Date(row.valid_from),
      },
    };
  }

  async save(extId: ExtId<Profile>, tickets: Tickets): Promise<void> {
    const profileId = await _findProfile(this._conn, extId);
    const { freeCar } = tickets;

    if (!freeCar) {
      const delSql = sql
        .delete("idz.free_car")
        .where("id", profileId)
        .toParams();

      await this._conn.query(delSql);
    } else {
      const saveSql = sql
        .insert("idz.free_car", {
          id: profileId,
          valid_from: freeCar.validFrom,
        })
        .onConflict("id")
        .doUpdate(["valid_from"])
        .toParams();

      await this._conn.query(saveSql);
    }
  }
}
