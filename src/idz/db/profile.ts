import * as sql from "sql-bricks";
import { ClientBase } from "pg";

import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Team } from "../model/team";
import { ProfileSpec, ProfileRepository } from "../repo";
import { generateId, Id } from "../../db";
import { AimeId } from "../../model";

function _extractProfile(row: any): Profile {
  return {
    aimeId: row.ext_id,
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

  async find(aimeId: AimeId): Promise<Id<Profile>> {
    const profileId = await this.peek(aimeId);

    if (profileId === undefined) {
      throw new Error(`Profile not found for Aime ID ${aimeId}`);
    }

    return profileId;
  }

  async peek(aimeId: AimeId): Promise<Id<Profile> | undefined> {
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
    }

    return row.id;
  }

  async load(id: Id<Profile>): Promise<Profile> {
    const loadSql = sql
      .select("p.*")
      .from("idz.profile p")
      .where("id", id)
      .toParams();

    const { rows } = await this._conn.query(loadSql);

    return _extractProfile(rows[0]);
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
      .where("id", profile.aimeId)
      .toParams();

    await this._conn.query(saveSql);
  }

  async create(
    aimeId: AimeId,
    profile: ProfileSpec,
    timestamp: Date
  ): Promise<Id<Profile>> {
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
    const playerId = row.id;

    const createSql = sql
      .insert("idz.profile", {
        id: id,
        player_id: playerId,
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

    return id as Id<Profile>;
  }
}
