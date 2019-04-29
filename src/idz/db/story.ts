import { Client } from "pg";
import * as sql from "sql-bricks-postgres";

import { _findProfile } from "./_util";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Story, StoryRow, StoryCell } from "../model/story";
import { FacetRepository } from "../repo";
import { generateId, Id } from "../../db";

export class SqlStoryRepository implements FacetRepository<Story> {
  constructor(private readonly _conn: Client) {}

  private async _load(extId: ExtId<Profile>): Promise<[Story, Id<Profile>]> {
    const profileId = await _findProfile(this._conn, extId);

    const loadSql = sql
      .select("s.*")
      .from("idz.story_state s")
      .where("s.id", profileId)
      .toParams();

    const headerResult = await this._conn.query(loadSql);
    const header = headerResult.rows[0];

    // Must succeed even if nonexistent (required by save method below)

    const result = {
      x: header !== undefined ? header.x : 0,
      y: header !== undefined ? header.y : 0,
      rows: new Array<StoryRow>(),
    };

    for (let i = 0; i < 9; i++) {
      const row: StoryRow = { cells: new Array<StoryCell>() };

      for (let j = 0; j < 9; j++) {
        row.cells.push({ a: 0, b: 0 });
      }

      result.rows.push(row);
    }

    const loadCellSql = sql
      .select("sc.*")
      .from("idz.story_cell_state sc")
      .where("sc.profile_id", profileId)
      .toParams();

    const { rows } = await this._conn.query(loadCellSql);

    for (const row of rows) {
      const cell = result.rows[row.row_no].cells[row.cell_no];

      cell.a = row.a;
      cell.b = row.b;
    }

    return [result, profileId];
  }

  async load(extId: ExtId<Profile>): Promise<Story> {
    const [story] = await this._load(extId);

    return story;
  }

  async save(extId: ExtId<Profile>, story: Story): Promise<void> {
    const [existing, profileId] = await this._load(extId);

    const headSql = sql
      .insert("idz.story_state", {
        id: profileId,
        x: story.x,
        y: story.y,
      })
      .onConflict("id")
      .doUpdate("x", "y")
      .toParams();

    await this._conn.query(headSql);

    for (let i = 0; i < story.rows.length; i++) {
      const exRow = existing.rows[i];
      const row = story.rows[i];

      for (let j = 0; j < row.cells.length; j++) {
        const exCell = exRow.cells[j];
        const cell = row.cells[j];

        if (cell.a === exCell.a && cell.b === exCell.b) {
          continue; // Most if not all cells are unchanged on profile save.
        }

        const cellSql = sql
          .insert("idz.story_cell_state", {
            id: generateId(),
            profile_id: profileId,
            row_no: i,
            col_no: j,
            a: cell.a,
            b: cell.b,
          })
          .onConflict("profile_id", "row_no", "col_no")
          .doUpdate("a", "b");

        await this._conn.query(cellSql);
      }
    }
  }
}
