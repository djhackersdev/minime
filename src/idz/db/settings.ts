import sql from "sql-bricks-postgres";

import { Settings } from "../model/settings";
import { Profile } from "../model/profile";
import { FacetRepository } from "../repo";
import { Id, Transaction } from "../../sql";

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
      music: row.music,
      pack: parseInt(row.pack, 10),
      paperCup: row.paper_cup,
      gauges: row.gauges,
    };
  }

  async save(profileId: Id<Profile>, settings: Settings): Promise<void> {
    const saveSql = sql
      .insert("idz_settings", {
        id: profileId,
        music: settings.music,
        pack: settings.pack,
        paper_cup: settings.paperCup,
        gauges: settings.gauges,
      })
      .onConflict("id")
      .doUpdate(["music", "pack", "paper_cup", "gauges"]);

    await this._txn.modify(saveSql);
  }
}
