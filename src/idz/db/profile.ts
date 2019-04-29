import * as sql from "sql-bricks";
import { ClientBase } from "pg";

import { _findProfile } from "./_util";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Team } from "../model/team";
import { ProfileSpec, ProfileRepository } from "../repo";
import { generateExtId, generateId, Id } from "../../db";
import { AimeId } from "../../model";

function _extractRow(row: any): Profile {
  return {
    id: row.ext_id,
    teamId: 2 as ExtId<Team>, // TODO
    name: row.name,
    lv: row.lv,
    exp: row.exp,
    fame: row.fame,
    dpoint: row.dpoint,
    mileage: row.mileage,
  };
}

export class SqlProfileRepository implements ProfileRepository {
  constructor(private readonly _conn: ClientBase) {}

  private async _tryLoadByAimeId(
    aimeId: AimeId
  ): Promise<Profile | undefined> {
    const lookupSql = sql
      .select("p.id")
      .from("idz.profile p")
      .join("aime.player r", { "p.player_id": "r.id" })
      .where("r.ext_id", aimeId)
      .toParams();

    const { rows } = await this._conn.query(lookupSql);
    const row = rows[0];

    if (row === undefined) {
      return undefined;
    } else {
      return _extractRow(row);
    }
  }

  async discoverByAimeId(aimeId: AimeId): Promise<boolean> {
    const result = await this._tryLoadByAimeId(aimeId);

    return result !== undefined;
  }

  async loadByAimeId(aimeId: AimeId): Promise<Profile> {
    const result = await this._tryLoadByAimeId(aimeId);

    if (result === undefined) {
      throw new Error("Profile not found for Aime ID");
    }

    return result;
  }

  async load(extId: ExtId<Profile>): Promise<Profile> {
    const loadSql = sql
      .select()
      .from("idz.profile")
      .where("ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);

    return _extractRow(rows[0]);
  }

  async save(profile: Profile, timestamp: Date): Promise<void> {
    const saveSql = sql
      .update("idz.profile", {
        lv: profile.lv,
        exp: profile.exp,
        fame: profile.fame,
        dpoint: profile.dpoint,
        mileage: profile.mileage,
        access_time: timestamp,
      })
      .where("ext_id", profile.id)
      .toParams();

    await this._conn.query(saveSql);
  }

  async create(
    aimeId: AimeId,
    profile: ProfileSpec,
    timestamp: Date
  ): Promise<ExtId<Profile>> {
    const findSql = sql
      .select("r.id")
      .from("aime.player r")
      .where("r.ext_id", aimeId)
      .toParams();

    const { rows } = await this._conn.query(findSql);
    const row = rows[0];

    if (row === undefined) {
      throw new Error("Aime ID not found");
    }

    const id = generateId();
    const extId = generateExtId() as ExtId<Profile>;
    const playerId = row.id;

    const createSql = sql
      .insert("idz.profile", {
        id: id,
        player_id: playerId,
        ext_id: extId,
        name: profile.name,
        lv: profile.lv,
        exp: profile.exp,
        fame: profile.fame,
        dpoint: profile.dpoint,
        mileage: profile.mileage,
        register_time: timestamp,
        access_time: timestamp,
      })
      .toParams();

    await this._conn.query(createSql);

    return extId;
  }
}
