import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserGameOptionItem } from "../model/userGameOption";
import { UserGameOptionRepository } from "../repo/userGameOption";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  bgInfo: T.number,
  fieldColor: T.number,
  guideSound: T.number,
  soundEffect: T.number,
  guideLine: T.number,
  speed: T.number,
  optionSet: T.number,
  matching: T.number,
  judgePos: T.number,
  rating: T.number,
  judgeJustice: T.number,
  judgeAttack: T.number,
  headphone: T.number,
  playerLevel: T.number,
  successTap: T.number,
  successExTap: T.number,
  successSlideHold: T.number,
  successAir: T.number,
  successFlick: T.number,
  successSkill: T.number,
  successTapTimbre: T.number,
  privacy: T.number,
});

export class SqlUserGameOptionRepository implements UserGameOptionRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(dataId: Id<UserDataItem>): Promise<UserGameOptionItem> {
    const stmt = sql
      .select("*")
      .from("cm_user_game_option")
      .where("id", dataId);

    const row = await this._txn.fetchRow(stmt);

    if (row === undefined) {
      throw new Error("UserGameOption record not found");
    }

    return readRow(row);
  }

  save(profileId: Id<UserDataItem>, obj: UserGameOptionItem): Promise<void> {
    const stmt = sql
      .insert("cm_user_game_option", {
        id: profileId,
        ...writeRow(obj),
      })
      .onConflict("id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
