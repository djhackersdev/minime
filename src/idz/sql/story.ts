import sql from "sql-bricks-postgres";

import { Profile } from "../model/profile";
import { Story, StoryRow, StoryCell } from "../model/story";
import { FacetRepository } from "../repo";
import { Id } from "../../model";
import { Transaction } from "../../sql";

export class SqlStoryRepository implements FacetRepository<Story> {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<Profile>): Promise<Story> {
    const loadSql = sql
      .select("s.*")
      .from("idz_story_state s")
      .where("s.id", profileId);

    const header = await this._txn.fetchRow(loadSql);

    // Must succeed even if nonexistent (required by save method below)

    const result = {
      x: header !== undefined ? parseInt(header.x) : 0,
      y: header !== undefined ? parseInt(header.y) : 0,
      rows: new Array<StoryRow>(),
    };

    for (let i = 0; i < 27; i++) {
      const row: StoryRow = { cells: new Array<StoryCell>() };

      for (let j = 0; j < 9; j++) {
        row.cells.push({ a: 0, b: 0 });
      }

      result.rows.push(row);
    }

    const loadCellSql = sql
      .select("sc.*")
      .from("idz_story_cell_state sc")
      .where("sc.profile_id", profileId);

    const rows = await this._txn.fetchRows(loadCellSql);

    for (const row of rows) {
      const rowNo = parseInt(row.row_no);
      const colNo = parseInt(row.col_no);
      const cell = result.rows[rowNo].cells[colNo];

      cell.a = parseInt(row.a);
      cell.b = parseInt(row.b);
    }

    return result;
  }

  async save(profileId: Id<Profile>, story: Story): Promise<void> {
    const existing = await this.load(profileId);

    const headSql = sql
      .insert("idz_story_state", {
        id: profileId,
        x: story.x,
        y: story.y,
      })
      .onConflict("id")
      .doUpdate(["x", "y"]);

    await this._txn.modify(headSql);

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
          .insert("idz_story_cell_state", {
            id: this._txn.generateId(),
            profile_id: profileId,
            row_no: i,
            col_no: j,
            a: cell.a,
            b: cell.b,
          })
          .onConflict("profile_id", "row_no", "col_no")
          .doUpdate(["a", "b"]);

        await this._txn.modify(cellSql);
      }
    }
  }
}
