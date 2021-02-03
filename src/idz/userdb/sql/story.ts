import sql from "sql-bricks-postgres";

import { Profile } from "../model/profile";
import { Story, StoryRow, StoryCell } from "../model/story";
import { FacetRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

function cellChanged(
  lhs: StoryCell | undefined,
  rhs: StoryCell | undefined
): boolean {
  if (!lhs) {
    return true;
  }

  if (!rhs) {
    return true;
  }

  return lhs.a !== rhs.a || lhs.b !== rhs.b || lhs.c !== rhs.c;
}

export class SqlStoryRepository implements FacetRepository<Story> {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<Profile>): Promise<Story> {
    const loadSql = sql
      .select("s.*")
      .from("idz_story_state s")
      .where("s.id", profileId);

    const header = await this._txn.fetchRow(loadSql);

    // Must succeed even if nonexistent (required by save method below)

    const result: Story = {
      x: header !== undefined ? parseInt(header.x!) : 0,
      y: header !== undefined ? parseInt(header.y!) : 0,
      rows: new Map<number, StoryRow>(),
    };

    const loadCellSql = sql
      .select("sc.*")
      .from("idz_story_cell_state sc")
      .where("sc.profile_id", profileId);

    const rows = await this._txn.fetchRows(loadCellSql);

    for (const row of rows) {
      const rowNo = parseInt(row.row_no!);
      const colNo = parseInt(row.col_no!);

      if (!result.rows.has(rowNo)) {
        result.rows.set(rowNo, {
          cells: new Map<number, StoryCell>(),
        });
      }

      const gridRow = result.rows.get(rowNo)!;

      if (!gridRow.cells.has(colNo)) {
        gridRow.cells.set(colNo, {
          a: 0,
          b: 0,
          c: 0,
        });
      }

      const cell = gridRow.cells.get(colNo)!;

      cell.a = parseInt(row.a!);
      cell.b = parseInt(row.b!);
      cell.c = parseInt(row.c!);
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

    for (const i of story.rows.keys()) {
      const exRow = existing.rows.get(i);
      const row = story.rows.get(i)!;

      for (const j of row.cells.keys()) {
        const exCell = exRow !== undefined ? exRow.cells.get(j) : undefined;
        const cell = row.cells.get(j)!;

        if (!cellChanged(cell, exCell)) {
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
            c: cell.c,
          })
          .onConflict("profile_id", "row_no", "col_no")
          .doUpdate(["a", "b", "c"]);

        await this._txn.modify(cellSql);
      }
    }
  }
}
