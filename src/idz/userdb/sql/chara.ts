import sql from "sql-bricks-postgres";

import { BackgroundCode, TitleCode } from "../model/base";
import { Chara, Gender } from "../model/chara";
import { Profile } from "../model/profile";
import { FacetRepository } from "../repo";
import { Id } from "../../../model";
import { Row, Transaction } from "../../../sql";

export function _extractChara(row: Row): Chara {
  return {
    gender: row.gender! as Gender,
    field_02: parseInt(row.field_02!),
    field_04: parseInt(row.field_04!),
    field_06: parseInt(row.field_06!),
    field_08: parseInt(row.field_08!),
    field_0a: parseInt(row.field_0a!),
    field_0c: parseInt(row.field_0c!),
    field_0e: parseInt(row.field_0e!),
    title: parseInt(row.title!) as TitleCode,
    background: parseInt(row.background!) as BackgroundCode,
  };
}

export class SqlCharaRepository implements FacetRepository<Chara> {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<Profile>): Promise<Chara> {
    const loadSql = sql
      .select("c.*")
      .from("idz_chara c")
      .where("c.id", profileId);

    const row = await this._txn.fetchRow(loadSql);

    if (row === undefined) {
      throw new Error(`Chara not found: profileId=${profileId}`);
    }

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
      ]);

    await this._txn.modify(saveSql);
  }
}
