import { ClientBase } from "pg";
import sql from "sql-bricks";

import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { TeamSpec, TeamRepository } from "../repo";
import { Id, generateExtId, generateId } from "../../db";

export class SqlTeamRepository implements TeamRepository {
  constructor(private readonly _conn: ClientBase) {}

  async find(extId: ExtId<Team>): Promise<Id<Team>> {
    const findSql = sql
      .select("t.id")
      .from("idz_team t")
      .where("t.ext_id", extId)
      .toParams();

    const { rows } = await this._conn.query(findSql);
    const row = rows[0];

    if (row === undefined) {
      throw new Error(`Team not found for ExtID ${extId}`);
    }

    return row.id;
  }

  async load(id: Id<Team>): Promise<Team> {
    const loadSql = sql
      .select("t.*")
      .from("idz_team t")
      .where("t.id", id)
      .toParams();

    const { rows } = await this._conn.query(loadSql);
    const row = rows[0];

    if (row == undefined) {
      throw new Error("Team not found");
    }

    return {
      extId: row.ext_id,
      name: row.name,
      nameBg: row.name_bg,
      nameFx: row.name_fx,
      registerTime: new Date(row.register_time),
    };
  }

  async save(id: Id<Team>, team: Team): Promise<void> {
    const saveSql = sql
      .update("idz_team", {
        name_bg: team.nameBg,
        name_fx: team.nameFx,
      })
      .where("id", id)
      .toParams();

    await this._conn.query(saveSql);
  }

  async create(team: TeamSpec): Promise<[Id<Team>, ExtId<Team>]> {
    const id = generateId() as Id<Team>;
    const extId = generateExtId() as ExtId<Team>;

    const createSql = sql
      .insert("idz_team", {
        id: id,
        ext_id: extId,
        name: team.name,
        name_bg: team.nameBg,
        name_fx: team.nameFx,
        register_time: team.registerTime,
      })
      .toParams();

    await this._conn.query(createSql);

    return [id, extId];
  }

  async delete(id: Id<Team>): Promise<void> {
    const deleteSql = sql
      .delete("idz_team")
      .where("id", id)
      .toParams();

    await this._conn.query(deleteSql);
  }
}
