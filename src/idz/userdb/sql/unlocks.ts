import sql from "sql-bricks-postgres";

import { Profile } from "../model/profile";
import { Unlocks } from "../model/unlocks";
import { FacetRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlUnlocksRepository implements FacetRepository<Unlocks> {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<Profile>): Promise<Unlocks> {
    const loadSql = sql
      .select("u.*")
      .from("idz_unlocks u")
      .where("u.id", profileId);

    const row = await this._txn.fetchRow(loadSql);

    if (row === undefined) {
      throw new Error(`Unlocks not found, profileId=${profileId}`);
    }

    return {
      auras: parseInt(row.auras!),
      cup: parseInt(row.cup!),
      gauges: parseInt(row.gauges!),
      music: parseInt(row.music!),
      lastMileageReward: parseInt(row.last_mileage_reward!),
    };
  }

  async save(profileId: Id<Profile>, unlocks: Unlocks): Promise<void> {
    const saveSql = sql
      .insert("idz_unlocks", {
        id: profileId,
        auras: unlocks.auras,
        cup: unlocks.cup,
        gauges: unlocks.gauges,
        music: unlocks.music,
        last_mileage_reward: unlocks.lastMileageReward,
      })
      .onConflict("id")
      .doUpdate(["auras", "cup", "gauges", "music", "last_mileage_reward"]);

    await this._txn.modify(saveSql);
  }
}
