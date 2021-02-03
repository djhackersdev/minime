import sql from "sql-bricks-postgres";

import { Settings } from "../model/settings";
import { Profile } from "../model/profile";
import { FacetRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlSettingsRepository implements FacetRepository<Settings> {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<Profile>): Promise<Settings> {
    const loadSql = sql
      .select("s.*")
      .from("idz_settings s")
      .where("s.id", profileId);

    const row = await this._txn.fetchRow(loadSql);

    if (row === undefined) {
      throw new Error(`Settings not found, profileId=${profileId}`);
    }

    return {
      music: parseInt(row.music!),
      pack: parseInt(row.pack!),
      aura: parseInt(row.aura!),
      paperCup: parseInt(row.paper_cup!),
      gauges: parseInt(row.gauges!),
      drivingStyle: parseInt(row.driving_style!),
    };
  }

  async save(profileId: Id<Profile>, settings: Settings): Promise<void> {
    const saveSql = sql
      .insert("idz_settings", {
        id: profileId,
        music: settings.music,
        pack: settings.pack,
        aura: settings.aura,
        paper_cup: settings.paperCup,
        gauges: settings.gauges,
        driving_style: settings.drivingStyle,
      })
      .onConflict("id")
      .doUpdate([
        "music",
        "pack",
        "aura",
        "paper_cup",
        "gauges",
        "driving_style",
      ]);

    await this._txn.modify(saveSql);
  }
}
