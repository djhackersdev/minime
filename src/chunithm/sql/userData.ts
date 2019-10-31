import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserDataRepository } from "../repo/userData";
import { AimeId, Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow } = createSqlMapper({
  accessCode: T.string,
  userName: T.string,
  isWebJoin: T.boolean,
  webLimitDate: T.Date,
  level: T.number,
  reincarnationNum: T.number,
  exp: T.number,
  point: T.number,
  totalPoint: T.bigint,
  playCount: T.number,
  multiPlayCount: T.number,
  multiWinCount: T.number,
  requestResCount: T.number,
  acceptResCount: T.number,
  successResCount: T.number,
  playerRating: T.number,
  highestRating: T.number,
  nameplateId: T.number,
  frameId: T.number,
  characterId: T.number,
  trophyId: T.number,
  playedTutorialBit: T.number,
  firstTutorialCancelNum: T.number,
  masterTutorialCancelNum: T.number,
  totalRepertoireCount: T.number,
  totalMapNum: T.number,
  totalHiScore: T.bigint,
  totalBasicHighScore: T.bigint,
  totalAdvancedHighScore: T.bigint,
  totalExpertHighScore: T.bigint,
  totalMasterHighScore: T.bigint,
  eventWatchedDate: T.Date,
  friendCount: T.number,
  isMaimai: T.boolean,
  firstGameId: T.string,
  firstRomVersion: T.string,
  firstDataVersion: T.string,
  firstPlayDate: T.Date,
  lastGameId: T.string,
  lastRomVersion: T.string,
  lastDataVersion: T.string,
  lastPlayDate: T.Date,
  lastPlaceId: T.number,
  lastPlaceName: T.string,
  lastRegionId: T.string,
  lastRegionName: T.string,
  lastAllNetId: T.string,
  lastClientId: T.string,
});

export class SqlUserDataRepository implements UserDataRepository {
  constructor(private readonly _txn: Transaction) {}

  async tryLookup(aimeId: AimeId): Promise<Id<UserDataItem> | undefined> {
    const stmt = sql
      .select("d.id")
      .from("cm_user_data d")
      .join("aime_player p", { "d.player_id": "p.id" })
      .where("p.ext_id", aimeId);

    const row = await this._txn.fetchRow(stmt);

    return row && (row.id as Id<UserDataItem>);
  }

  async lookup(aimeId: AimeId): Promise<Id<UserDataItem>> {
    const id = await this.tryLookup(aimeId);

    if (id === undefined) {
      throw new Error("AiMe ID not found");
    }

    return id;
  }

  async load(dataId: Id<UserDataItem>): Promise<UserDataItem> {
    const stmt = sql
      .select("*")
      .from("cm_user_data")
      .where("id", dataId);

    const row = await this._txn.fetchRow(stmt);

    if (row === undefined) {
      throw new Error("UserData record not found");
    }

    return readRow(row);
  }

  async save(aimeId: AimeId, obj: UserDataItem): Promise<Id<UserDataItem>> {
    const lookupStmt = sql
      .select("p.id as player_id", "d.id as data_id")
      .from("aime_player p")
      .leftJoin("cm_user_data d", { "p.id": "d.player_id" })
      .where("p.ext_id", aimeId);

    const row = await this._txn.fetchRow(lookupStmt);

    if (row === undefined) {
      throw new Error("AiMe ID not found");
    }

    const playerId = row.player_id;
    const existingId = row.data_id as Id<UserDataItem>;

    if (existingId !== null) {
      const stmt = sql
        .update("cm_user_data", writeRow(obj))
        .where("id", existingId);

      await this._txn.modify(stmt);

      return existingId;
    } else {
      const id = this._txn.generateId();
      const insertStmt = sql.insert("cm_user_data", {
        id: id,
        player_id: playerId,
        ...writeRow(obj),
      });

      await this._txn.modify(insertStmt);

      return id as Id<UserDataItem>;
    }
  }
}
