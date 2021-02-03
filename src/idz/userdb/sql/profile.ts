import sql from "sql-bricks-postgres";

import { Profile } from "../model/profile";
import { ProfileRepository } from "../repo";
import { AimeId, Id } from "../../../model";
import { Row, Transaction } from "../../../sql";

export function _extractProfile(row: Row): Profile {
  return {
    aimeId: parseInt(row.aime_id!) as AimeId,
    version: parseInt(row.version!),
    name: row.name!,
    lv: parseInt(row.lv!),
    exp: parseInt(row.exp!),
    fame: parseInt(row.fame!),
    dpoint: parseInt(row.dpoint!),
    mileage: parseInt(row.mileage!),
    accessTime: new Date(row.access_time!),
    registerTime: new Date(row.register_time!),
  };
}

export class SqlProfileRepository implements ProfileRepository {
  constructor(private readonly _txn: Transaction) {}

  async find(aimeId: AimeId, version: number): Promise<Id<Profile>> {
    const profileId = await this.peek(aimeId, version);

    if (profileId === undefined) {
      throw new Error(`Profile not found for Aime ID ${aimeId}`);
    }

    return profileId;
  }

  async peek(
    aimeId: AimeId,
    version: number
  ): Promise<Id<Profile> | undefined> {
    const lookupSql = sql
      .select("p.id")
      .from("idz_profile p")
      .join("aime_player r", { "p.player_id": "r.id" })
      .where("r.ext_id", aimeId)
      .and("p.version", version);

    const row = await this._txn.fetchRow(lookupSql);

    if (row === undefined) {
      return undefined;
    }

    return row.id as Id<Profile>;
  }

  async load(id: Id<Profile>): Promise<Profile> {
    const loadSql = sql
      .select("p.*", "r.ext_id as aime_id")
      .from("idz_profile p")
      .join("aime_player r", { "p.player_id": "r.id" })
      .where("p.id", id);

    const row = await this._txn.fetchRow(loadSql);

    if (row === undefined) {
      throw new Error(`Profile not found, id=${id}`);
    }

    return _extractProfile(row);
  }

  async save(id: Id<Profile>, profile: Profile): Promise<void> {
    const saveSql = sql
      .update("idz_profile", {
        lv: profile.lv,
        exp: profile.exp,
        fame: profile.fame,
        dpoint: profile.dpoint,
        mileage: profile.mileage,
        access_time: profile.accessTime.toISOString(),
      })
      .where("id", id);

    await this._txn.modify(saveSql);
  }

  async create(profile: Profile): Promise<Id<Profile>> {
    const findSql = sql
      .select("r.id")
      .from("aime_player r")
      .where("r.ext_id", profile.aimeId);

    const row = await this._txn.fetchRow(findSql);

    if (row === undefined) {
      throw new Error("Aime ID not found");
    }

    const id = this._txn.generateId<Profile>();
    const playerId = row.id;

    const createSql = sql.insert("idz_profile", {
      id: id,
      player_id: playerId,
      version: profile.version,
      name: profile.name,
      lv: profile.lv,
      exp: profile.exp,
      fame: profile.fame,
      dpoint: profile.dpoint,
      mileage: profile.mileage,
      register_time: profile.registerTime.toISOString(),
      access_time: profile.accessTime.toISOString(),
    });

    await this._txn.modify(createSql);

    return id;
  }
}
