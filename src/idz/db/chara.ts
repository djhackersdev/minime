import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { Chara } from "../model/chara";
import { Profile } from "../model/profile";
import { FacetRepository } from "../repo";
import { Id } from "../../db";

export function _extractChara(row: any): Chara {
  return {
    gender: row.gender,
    field_02: row.field_02,
    field_04: row.field_04,
    field_06: row.field_06,
    field_08: row.field_08,
    field_0a: row.field_0a,
    field_0c: row.field_0c,
    field_0e: row.field_0e,
    title: row.title,
    background: row.background,
  };
}

export class SqlCharaRepository implements FacetRepository<Chara> {
  constructor(private readonly _conn: ClientBase) {}

  async load(profileId: Id<Profile>): Promise<Chara> {
    const loadSql = sql
      .select("c.*")
      .from("idz_chara c")
      .where("c.id", profileId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const row = rows[0];

    return _extractChara(row);
  }

  async save(profileId: Id<Profile>, chara: Chara): Promise<void> {
    const saveSql = sql
      .insert("idz_chara", {
        id: profileId,
        gender: chara.gender,
        field_02: chara.field_02,
        field_04: chara.field_04,
        field_06: chara.field_06,
        field_08: chara.field_08,
        field_0a: chara.field_0a,
        field_0c: chara.field_0c,
        field_0e: chara.field_0e,
        title: chara.title,
        background: chara.background,
      })
      .onConflict("id")
      .doUpdate([
        "field_02",
        "field_04",
        "field_06",
        "field_08",
        "field_0a",
        "field_0c",
        "field_0e",
        "title",
        "background",
      ])
      .toParams();

    await this._conn.query(saveSql);
  }
}
