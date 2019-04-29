import { Client } from "pg";
import * as sql from "sql-bricks-postgres";

import { _findProfile } from "./_util";
import { ExtId } from "../model/base";
import { MissionGrid, MissionState } from "../model/mission";
import { Profile } from "../model/profile";
import { FacetRepository } from "../repo";
import { generateId, Id } from "../../db";

export class SqlMissionsRepository implements FacetRepository<MissionState> {
  constructor(private readonly _conn: Client) {}

  private async _load(
    extId: ExtId<Profile>
  ): Promise<[MissionState, Id<Profile>]> {
    const result: MissionState = {
      team: new Array<MissionGrid>(),
      solo: new Array<MissionGrid>(),
    };

    for (let i = 0; i < 5; i++) {
      const soloGrid: MissionGrid = { cells: new Array<number>() };
      const teamGrid: MissionGrid = { cells: new Array<number>() };

      for (let j = 0; j < 9; j++) {
        soloGrid.cells.push(0);
        teamGrid.cells.push(0);
      }
    }

    const profileId = await _findProfile(this._conn, extId);

    const loadSoloSql = sql
      .select("sm.*")
      .from("idz.solo_mission_state sm")
      .where("sm.profile_id", profileId)
      .toParams();

    const { rows } = await this._conn.query(loadSoloSql);

    for (const row of rows) {
      result.solo[row.grid_no].cells[row.cell_no] = row.value;
    }

    return [result, profileId];
  }

  async load(extId: ExtId<Profile>): Promise<MissionState> {
    const [mission] = await this._load(extId);

    return mission;
  }

  async save(extId: ExtId<Profile>, mission: MissionState): Promise<void> {
    const [existing, profileId] = await this._load(extId);

    for (let i = 0; i < mission.solo.length; i++) {
      const exGrid = existing.solo[i].cells;
      const grid = mission.solo[i].cells;

      for (let j = 0; j < grid.length; j++) {
        if (grid[j] === exGrid[j]) {
          continue; // Most if not all cells are unaffected on save
        }

        const saveSql = sql
          .insert("idz.mission_state", {
            id: generateId(),
            profile_id: profileId,
            grid_no: i,
            cell_no: j,
            value: grid[j],
          })
          .onConflict("profile_id", "grid_no", "cell_no")
          .doUpdate("value")
          .toParams();

        await this._conn.query(saveSql);
      }
    }
  }
}
