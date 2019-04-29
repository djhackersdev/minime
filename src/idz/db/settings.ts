import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { _findProfile } from "./_util";
import { ExtId } from "../model/base";
import { Settings } from "../model/settings";
import { Profile } from "../model/profile";
import { FacetRepository } from "../repo";

export class SqlSettingsRepository implements FacetRepository<Settings> {
  constructor(private readonly _conn: ClientBase) {}

  async load(extId: ExtId<Profile>): Promise<Settings> {
    const loadSql = sql
      .select("s.*")
      .from("idz.profile p")
      .join("idz.settings s", { "p.id": "s.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const row = rows[0];

    return {
      music: row.music,
      pack: parseInt(row.pack, 10),
      paperCup: row.paper_cup,
      gauges: row.gauges,
    };
  }

  async save(extId: ExtId<Profile>, settings: Settings): Promise<void> {
    const profileId = await _findProfile(this._conn, extId);

    const saveSql = sql
      .insert("idz.settings", {
        id: profileId,
        music: settings.music,
        pack: settings.pack,
        paper_cup: settings.paperCup,
        gauges: settings.gauges,
      })
      .onConflict("id")
      .doUpdate(["music", "pack", "paper_cup", "gauges"])
      .toParams();

    await this._conn.query(saveSql);
  }
}
