import { ClientBase } from "pg";
import * as sql from "sql-bricks";

import { _findProfile } from "./_util";
import { BackgroundCode, ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { FlagRepository } from "../repo";
import { generateId } from "../../db";

export class SqlBackgroundsRepository
  implements FlagRepository<BackgroundCode> {
  constructor(private readonly _conn: ClientBase) {}

  async loadAll(extId: ExtId<Profile>): Promise<Set<BackgroundCode>> {
    const loadSql = sql
      .select("bg.background_no")
      .from("idz.background_unlock bg")
      .join("idz.profile p", { "bg.profile_id": "p.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const result = new Set<BackgroundCode>();

    for (const row of rows) {
      result.add(row.background_no);
    }

    return result;
  }

  async saveAll(
    extId: ExtId<Profile>,
    flags: Set<BackgroundCode>
  ): Promise<void> {
    const profileId = await _findProfile(this._conn, extId);
    const existing = await this.loadAll(extId);

    for (const flag of flags) {
      if (existing.has(flag)) {
        continue;
      }

      const saveSql = sql
        .insert("idz.background_unlock", {
          id: generateId(),
          profile_id: profileId,
          background_no: flag,
        })
        .toParams();

      await this._conn.query(saveSql);
    }
  }
}
