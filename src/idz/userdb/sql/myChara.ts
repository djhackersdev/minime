import sql from "sql-bricks-postgres";

import { MyCharaCode } from "../model/base";
import { Profile } from "../model/profile";
import { FlagRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlMyCharaRepository implements FlagRepository<MyCharaCode> {
  constructor(private readonly _txn: Transaction) {}

  async loadAll(id: Id<Profile>): Promise<Set<MyCharaCode>> {
    const loadSql = sql
      .select("mc.my_chara_no")
      .from("idz_my_chara mc")
      .join("idz_profile p", { "mc.profile_id": "p.id" })
      .where("p.id", id);

    const rows = await this._txn.fetchRows(loadSql);
    const result = new Set<MyCharaCode>();

    for (const row of rows) {
      result.add(parseInt(row.my_chara_no!) as MyCharaCode);
    }

    return result;
  }

  async saveAll(
    profileId: Id<Profile>,
    flags: Set<MyCharaCode>
  ): Promise<void> {
    const existing = await this.loadAll(profileId);

    for (const flag of flags) {
      if (existing.has(flag)) {
        continue;
      }

      const saveSql = sql
        .insert("idz_my_chara", {
          id: this._txn.generateId(),
          profile_id: profileId,
          my_chara_no: flag,
        })
        .onConflict("profile_id", "my_chara_no")
        .doNothing();

      await this._txn.modify(saveSql);
    }
  }
}
