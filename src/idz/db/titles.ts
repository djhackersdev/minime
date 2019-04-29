import { ClientBase } from "pg";
import * as sql from "sql-bricks";

import { _findProfile } from "./_util";
import { TitleCode, ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { FlagRepository } from "../repo";
import { generateId } from "../../db";

export class SqlTitlesRepository implements FlagRepository<TitleCode> {
  constructor(private readonly _conn: ClientBase) {}

  async loadAll(extId: ExtId<Profile>): Promise<Set<TitleCode>> {
    const loadSql = sql
      .select("t.title_no")
      .from("idz.title_unlock t")
      .join("idz.profile p", { "t.profile_id": "p.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const result = new Set<TitleCode>();

    for (const row of rows) {
      result.add(row.title_no);
    }

    return result;
  }

  async saveAll(extId: ExtId<Profile>, flags: Set<TitleCode>): Promise<void> {
    const profileId = await _findProfile(this._conn, extId);
    const existing = await this.loadAll(extId);

    for (const flag of flags) {
      if (existing.has(flag)) {
        continue;
      }

      const saveSql = sql
        .insert("idz.title_unlock", {
          id: generateId(),
          profile_id: profileId,
          title_no: flag,
        })
        .toParams();

      await this._conn.query(saveSql);
    }
  }
}
