import { ClientBase } from "pg";
import sql from "sql-bricks";

import { BackgroundCode } from "../model/base";
import { Profile } from "../model/profile";
import { FlagRepository } from "../repo";
import { generateId, Id } from "../../db";

export class SqlBackgroundsRepository
  implements FlagRepository<BackgroundCode> {
  constructor(private readonly _conn: ClientBase) {}

  async loadAll(id: Id<Profile>): Promise<Set<BackgroundCode>> {
    const loadSql = sql
      .select("bg.background_no")
      .from("idz_background_unlock bg")
      .join("idz_profile p", { "bg.profile_id": "p.id" })
      .where("p.id", id)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const result = new Set<BackgroundCode>();

    for (const row of rows) {
      result.add(row.background_no);
    }

    return result;
  }

  async saveAll(
    profileId: Id<Profile>,
    flags: Set<BackgroundCode>
  ): Promise<void> {
    const existing = await this.loadAll(profileId);

    for (const flag of flags) {
      if (existing.has(flag)) {
        continue;
      }

      const saveSql = sql
        .insert("idz_background_unlock", {
          id: generateId(),
          profile_id: profileId,
          background_no: flag,
        })
        .toParams();

      await this._conn.query(saveSql);
    }
  }
}
