import sql from "sql-bricks-postgres";

import { MissionGrid, MissionState } from "../model/mission";
import { Profile } from "../model/profile";
import { FacetRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

export class SqlMissionsRepository implements FacetRepository<MissionState> {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<Profile>): Promise<MissionState> {
    const result: MissionState = {
      solo: new Array<MissionGrid>(),
      team: new Array<MissionGrid>(),
    };

    for (let i = 0; i < 5; i++) {
      const soloGrid: MissionGrid = { cells: new Array<number>() };
      const teamGrid: MissionGrid = { cells: new Array<number>() };

      for (let j = 0; j < 9; j++) {
        soloGrid.cells.push(0);
        teamGrid.cells.push(0);
      }

      result.solo.push(soloGrid);
      result.team.push(teamGrid);
    }

    const loadSoloSql = sql
      .select("sm.*")
      .from("idz_solo_mission_state sm")
      .where("sm.profile_id", profileId);

    const rows = await this._txn.fetchRows(loadSoloSql);

    for (const row of rows) {
      const gridNo = parseInt(row.grid_no!);
      const cellNo = parseInt(row.cell_no!);
      const value = parseInt(row.value!);

      result.solo[gridNo].cells[cellNo] = value;
    }

    return result;
  }

  async save(profileId: Id<Profile>, mission: MissionState): Promise<void> {
    const existing = await this.load(profileId);

    for (let i = 0; i < mission.solo.length; i++) {
      const exGrid = existing.solo[i].cells;
      const grid = mission.solo[i].cells;

      for (let j = 0; j < grid.length; j++) {
        if (grid[j] === exGrid[j]) {
          continue; // Most if not all cells are unaffected on save
        }

        const saveSql = sql
          .insert("idz_solo_mission_state", {
            id: this._txn.generateId(),
            profile_id: profileId,
            grid_no: i,
            cell_no: j,
            value: grid[j],
          })
          .onConflict("profile_id", "grid_no", "cell_no")
          .doUpdate(["value"]);

        await this._txn.modify(saveSql);
      }
    }
  }
}
