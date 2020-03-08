import sql from "sql-bricks-postgres";

import { TitleCode } from "../model/base";
import { Profile } from "../model/profile";
import { FlagRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlTitlesRepository implements FlagRepository<TitleCode> {
  constructor(private readonly _txn: Transaction) {}

  async loadAll(profileId: Id<Profile>): Promise<Set<TitleCode>> {
    const loadSql = sql
      .select("t.title_no")
      .from("idz_title_unlock t")
      .where("t.profile_id", profileId);

    const rows = await this._txn.fetchRows(loadSql);
    const result = new Set<TitleCode>();

    for (const row of rows) {
      result.add(parseInt(row.title_no!) as TitleCode);
    }

    return result;
  }

  async saveAll(profileId: Id<Profile>, flags: Set<TitleCode>): Promise<void> {
    const existing = await this.loadAll(profileId);

    for (const flag of flags) {
      if (existing.has(flag)) {
        continue;
      }

      const saveSql = sql.insert("idz_title_unlock", {
        id: this._txn.generateId(),
        profile_id: profileId,
        title_no: flag,
      });

      await this._txn.modify(saveSql);
    }
  }
}
