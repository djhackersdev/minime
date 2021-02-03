import sql from "sql-bricks-postgres";

import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { TeamSpec, TeamRepository } from "../repo";
import { Id, generateExtId } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlTeamRepository implements TeamRepository {
  constructor(private readonly _txn: Transaction) {}

  async find(extId: ExtId<Team>): Promise<Id<Team>> {
    const findSql = sql
      .select("t.id")
      .from("idz_team t")
      .where("t.ext_id", extId);

    const row = await this._txn.fetchRow(findSql);

    if (row === undefined) {
      throw new Error(`Team not found for ExtID ${extId}`);
    }

    return row.id as Id<Team>;
  }

  async load(id: Id<Team>): Promise<Team> {
    const loadSql = sql
      .select("t.*")
      .from("idz_team t")
      .where("t.id", id);

    const row = await this._txn.fetchRow(loadSql);

    if (row === undefined) {
      throw new Error("Team not found");
    }

    return {
      version: parseInt(row.version!),
      extId: parseInt(row.ext_id!) as ExtId<Team>,
      name: row.name!,
      nameBg: parseInt(row.name_bg!),
      nameFx: parseInt(row.name_fx!),
      registerTime: new Date(row.register_time!),
    };
  }

  async save(id: Id<Team>, team: Team): Promise<void> {
    const saveSql = sql
      .update("idz_team", {
        name_bg: team.nameBg,
        name_fx: team.nameFx,
      })
      .where("id", id);

    await this._txn.modify(saveSql);
  }

  async create(team: TeamSpec): Promise<[Id<Team>, ExtId<Team>]> {
    const id = this._txn.generateId<Team>();
    const extId = generateExtId() as ExtId<Team>;

    const createSql = sql.insert("idz_team", {
      id: id,
      ext_id: extId,
      version: team.version,
      name: team.name,
      name_bg: team.nameBg,
      name_fx: team.nameFx,
      register_time: team.registerTime,
    });

    await this._txn.modify(createSql);

    return [id, extId];
  }

  async delete(id: Id<Team>): Promise<void> {
    const deleteSql = sql.delete("idz_team").where("id", id);

    await this._txn.modify(deleteSql);
  }
}
