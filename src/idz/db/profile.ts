import * as sql from "sql-bricks";
import { Client } from "pg";

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
  constructor(private readonly _conn: Client) {}

  async discoverByAimeId(aimeId: AimeId): Promise<boolean> {
    const profileId = await this._findProfile(aimeId);

    return profileId !== undefined;
  }

  async loadByAimeId(aimeId: AimeId): Promise<Profile> {
    const profileId = await this._findProfile(aimeId);

    if (profileId === undefined) {
      throw new Error("Profile not found");
    }

    const loadSql = sql
      .select()
      .from("idz.profile")
      .where("id", profileId)
      .toParams();

    const { rows } = await this._conn.query(loadSql);

    return _extractRow(rows[0]);
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

  async save(profile: Profile): Promise<void> {
    const saveSql = sql
      .update("idz.profile", {
        lv: profile.lv,
        exp: profile.exp,
        fame: profile.fame,
        dpoint: profile.dpoint,
        mileage: profile.mileage,
      })
      .where("ext_id", profile.id)
      .toParams();

    await this._conn.query(saveSql);
  }

  async create(profile: ProfileSpec): Promise<ExtId<Profile>> {
    const id = generateId();
    const extId = generateExtId() as ExtId<Profile>;

    const createSql = sql
      .insert("idz.profile", {
        id: id,
        ext_id: extId,
        name: profile.name,
        lv: profile.lv,
        exp: profile.exp,
        fame: profile.fame,
        dpoint: profile.dpoint,
        mileage: profile.mileage,
      })
      .toParams();

    await this._conn.query(createSql);

    return extId;
  }

  async _findProfile(aimeId: AimeId): Promise<Id<Profile> | undefined> {
    const lookupSql = sql
      .select("r.id")
      .from("idz.profile r")
      .join("aime.player p", { "r.player_id": "p.id" })
      .where("p.aime_id", aimeId)
      .toParams();

    const { rows } = await this._conn.query(lookupSql);

    if (rows.length > 0) {
      return rows[0].id as Id<Profile>;
    } else {
      return undefined;
    }
  }
}
