import sql from "sql-bricks-postgres";

import { BackgroundCode } from "../model/base";
import { Profile } from "../model/profile";
import { FlagRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlBackgroundsRepository
  implements FlagRepository<BackgroundCode> {
  constructor(private readonly _txn: Transaction) {}

  async loadAll(id: Id<Profile>): Promise<Set<BackgroundCode>> {
    const loadSql = sql
      .select("bg.background_no")
      .from("idz_background_unlock bg")
      .join("idz_profile p", { "bg.profile_id": "p.id" })
      .where("p.id", id);

    const rows = await this._txn.fetchRows(loadSql);
    const result = new Set<BackgroundCode>();

    for (const row of rows) {
      result.add(parseInt(row.background_no!) as BackgroundCode);
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

      const saveSql = sql.insert("idz_background_unlock", {
        id: this._txn.generateId(),
        profile_id: profileId,
        background_no: flag,
      });

      await this._txn.modify(saveSql);
    }
  }
}
