import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { _findProfile } from "./_util";
import { ExtId } from "../model/base";
import { Chara } from "../model/chara";
import { Profile } from "../model/profile";
import { FacetRepository } from "../repo";

export class SqlCharaRepository implements FacetRepository<Chara> {
  constructor(private readonly _conn: ClientBase) {}

  async load(extId: ExtId<Profile>): Promise<Chara> {
    const loadSql = sql
      .select("c.*")
      .from("idz.profile p")
      .join("idz.chara c", { "p.id": "c.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const row = rows[0];

    return {
      gender: row.gender,
      field_02: row.field_02,
      field_04: row.field_04,
      field_06: row.field_06,
      field_08: row.field_08,
      field_0A: row.field_0A,
      field_0C: row.field_0C,
      field_0E: row.field_0E,
      title: row.title,
      background: row.background,
    };
  }

  async save(extId: ExtId<Profile>, chara: Chara): Promise<void> {
    const profileId = await _findProfile(this._conn, extId);

    const saveSql = sql
      .insert("idz.chara", {
        id: profileId,
        gender: chara.gender,
        field_02: chara.field_02,
        field_04: chara.field_04,
        field_06: chara.field_06,
        field_08: chara.field_08,
        field_0A: chara.field_0A,
        field_0C: chara.field_0C,
        field_0E: chara.field_0E,
        title: chara.title,
        background: chara.background,
      })
      .onConflict("id")
      .doUpdate([
        "field_02",
        "field_04",
        "field_06",
        "field_08",
        "field_0A",
        "field_0C",
        "field_0E",
      ])
      .toParams();

    await this._conn.query(saveSql);
  }
}
