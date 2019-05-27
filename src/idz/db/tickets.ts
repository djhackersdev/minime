import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { Profile } from "../model/profile";
import { Tickets } from "../model/tickets";
import { FacetRepository } from "../repo";
import { Id } from "../../db";

// TODO free continue

export class SqlTicketsRepository implements FacetRepository<Tickets> {
  constructor(private readonly _conn: ClientBase) {}

  async load(profileId: Id<Profile>): Promise<Tickets> {
    const loadSql = sql
      .select("fc.*")
      .from("idz.free_car fc")
      .where("fc.id", profileId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const row = rows[0];

    return {
      freeCar: row && {
        validFrom: new Date(row.valid_from),
      },
    };
  }

  async save(profileId: Id<Profile>, tickets: Tickets): Promise<void> {
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
