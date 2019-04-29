import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { _findProfile } from "./_util";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Unlocks } from "../model/unlocks";
import { FacetRepository } from "../repo";

export class SqlUnlocksRepository implements FacetRepository<Unlocks> {
  constructor(private readonly _conn: ClientBase) {}

  async load(extId: ExtId<Profile>): Promise<Unlocks> {
    const loadSql = sql
      .select("u.*")
      .from("idz.profile p")
      .join("idz.unlocks u", { "p.id": "u.id" })
      .where("p.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const row = rows[0];

    return {
      cup: row.cup,
      gauges: row.gauges,
      music: row.music,
      lastMileageReward: row.last_mileage_reward,
    };
  }

  async save(extId: ExtId<Profile>, unlocks: Unlocks): Promise<void> {
    const profileId = await _findProfile(this._conn, extId);

    const saveSql = sql
      .insert("idz.unlocks", {
        id: profileId,
        cup: unlocks.cup,
        gauges: unlocks.gauges,
        music: unlocks.music,
        last_mileage_reward: unlocks.lastMileageReward,
      })
      .onConflict("id")
      .doUpdate(["cup", "gauges", "music", "last_mileage_reward"])
      .toParams();

    await this._conn.query(saveSql);
  }
}
