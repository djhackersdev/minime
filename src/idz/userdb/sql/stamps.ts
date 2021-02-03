import sql from "sql-bricks-postgres";

import { StampCode } from "../model/base";
import { SelectedStamps } from "../model/stamps";
import { Profile } from "../model/profile";
import { StampsRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

const defaultSelection: SelectedStamps = {
  stamp01: 0 as StampCode,
  stamp02: 0 as StampCode,
  stamp03: 0 as StampCode,
  stamp04: 0 as StampCode,
};

export class SqlStampsRepository implements StampsRepository {
  constructor(private readonly _txn: Transaction) {}

  async loadAll(id: Id<Profile>): Promise<Set<StampCode>> {
    const loadSql = sql
      .select("stamp.stamp_no")
      .from("idz_stamp_unlock stamp")
      .join("idz_profile p", { "stamp.profile_id": "p.id" })
      .where("p.id", id);

    const rows = await this._txn.fetchRows(loadSql);
    const result = new Set<StampCode>();

    for (const row of rows) {
      result.add(parseInt(row.stamp_no!) as StampCode);
    }

    return result;
  }

  async loadSelection(id: Id<Profile>): Promise<SelectedStamps> {
    const loadSql = sql
      .select("stamp.*")
      .from("idz_stamp_selections stamp")
      .join("idz_profile p", { "stamp.id": "p.id" })
      .where("p.id", id);

    const row = await this._txn.fetchRow(loadSql);

    if (row === undefined) {
      return { ...defaultSelection };
    }

    return {
      stamp01: parseInt(row.stamp_01!) as StampCode,
      stamp02: parseInt(row.stamp_02!) as StampCode,
      stamp03: parseInt(row.stamp_03!) as StampCode,
      stamp04: parseInt(row.stamp_04!) as StampCode,
    };
  }

  async saveSelection(
    profileId: Id<Profile>,
    selection: SelectedStamps
  ): Promise<void> {
    const saveSql = sql
      .insert("idz_stamp_selections", {
        id: profileId,
        stamp_01: selection.stamp01,
        stamp_02: selection.stamp02,
        stamp_03: selection.stamp03,
        stamp_04: selection.stamp04,
      })
      .onConflict("id")
      .doUpdate(["stamp_01", "stamp_02", "stamp_03", "stamp_04"]);

    await this._txn.modify(saveSql);
  }

  async saveAll(profileId: Id<Profile>, flags: Set<StampCode>): Promise<void> {
    const existing = await this.loadAll(profileId);

    for (const flag of flags) {
      if (existing.has(flag)) {
        continue;
      }

      const saveSql = sql
        .insert("idz_stamp_unlock", {
          id: this._txn.generateId(),
          profile_id: profileId,
          stamp_no: flag,
        })
        .onConflict("profile_id", "stamp_no")
        .doNothing();

      await this._txn.modify(saveSql);
    }
  }
}
