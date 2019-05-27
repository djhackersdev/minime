import { ClientBase } from "pg";
import * as sql from "sql-bricks";

import { TitleCode, ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { FlagRepository } from "../repo";
import { generateId, Id } from "../../db";

export class SqlTitlesRepository implements FlagRepository<TitleCode> {
  constructor(private readonly _conn: ClientBase) {}

  async loadAll(profileId: Id<Profile>): Promise<Set<TitleCode>> {
    const loadSql = sql
      .select("t.title_no")
      .from("idz.title_unlock t")
      .where("t.profile_id", profileId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const result = new Set<TitleCode>();

    for (const row of rows) {
      result.add(row.title_no);
    }

    return result;
  }

  async saveAll(profileId: Id<Profile>, flags: Set<TitleCode>): Promise<void> {
    const existing = await this.loadAll(profileId);

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
