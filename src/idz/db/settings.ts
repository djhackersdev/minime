import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { Settings } from "../model/settings";
import { Profile } from "../model/profile";
import { FacetRepository } from "../repo";
import { Id } from "../../db";

export class SqlSettingsRepository implements FacetRepository<Settings> {
  constructor(private readonly _conn: ClientBase) {}

  async load(profileId: Id<Profile>): Promise<Settings> {
    const loadSql = sql
      .select("s.*")
      .from("idz.settings s")
      .where("s.id", profileId)
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

  async save(profileId: Id<Profile>, settings: Settings): Promise<void> {
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
