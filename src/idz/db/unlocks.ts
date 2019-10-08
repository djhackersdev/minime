import { ClientBase } from "pg";
import * as sql from "sql-bricks-postgres";

import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Unlocks } from "../model/unlocks";
import { FacetRepository } from "../repo";
import { Id } from "../../db";

export class SqlUnlocksRepository implements FacetRepository<Unlocks> {
  constructor(private readonly _conn: ClientBase) {}

  async load(profileId: Id<Profile>): Promise<Unlocks> {
    const loadSql = sql
      .select("u.*")
      .from("idz_unlocks u")
      .where("u.id", profileId)
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

  async save(profileId: Id<Profile>, unlocks: Unlocks): Promise<void> {
    const saveSql = sql
      .insert("idz_unlocks", {
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
