import sql from "sql-bricks-postgres";

import { Id } from "../../model";
import { UserDataItem } from "../model/userData";
import { UserPlaylogItem } from "../model/userPlaylog";
import { UserPlaylogRepository } from "../repo/userPlaylog";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow } = createSqlMapper({
  orderId: T.number,
  sortNumber: T.number,
  placeId: T.number,
  playDate: T.Date,
  userPlayDate: T.Date,
  musicId: T.number,
  level: T.number,
  customId: T.number,
  playedUserId1: T.number,
  playedUserId2: T.number,
  playedUserId3: T.number,
  playedUserName1: T.string,
  playedUserName2: T.string,
  playedUserName3: T.string,
  playedMusicLevel1: T.number,
  playedMusicLevel2: T.number,
  playedMusicLevel3: T.number,
  playedCustom1: T.number,
  playedCustom2: T.number,
  playedCustom3: T.number,
  track: T.number,
  score: T.number,
  rank: T.number,
  maxCombo: T.number,
  maxChain: T.number,
  rateTap: T.number,
  rateHold: T.number,
  rateSlide: T.number,
  rateAir: T.number,
  rateFlick: T.number,
  judgeGuilty: T.number,
  judgeAttack: T.number,
  judgeJustice: T.number,
  judgeCritical: T.number,
  eventId: T.number,
  playerRating: T.number,
  isNewRecord: T.boolean,
  isFullCombo: T.boolean,
  fullChainKind: T.number,
  isAllJustice: T.boolean,
  isContinue: T.boolean,
  isFreeToPlay: T.boolean,
  characterId: T.number,
  skillId: T.number,
  playKind: T.number,
  isClear: T.boolean,
  skillLevel: T.number,
  skillEffect: T.number,
  placeName: T.string,
  isMaimai: T.boolean,
});

export class SqlUserPlaylogRepository implements UserPlaylogRepository {
  constructor(private readonly _txn: Transaction) {}

  save(profileId: Id<UserDataItem>, obj: UserPlaylogItem): Promise<void> {
    const stmt = sql.insert("cm_user_playlog", {
      id: this._txn.generateId(),
      profile_id: profileId,
      ...writeRow(obj),
    });

    return this._txn.modify(stmt);
  }

  async loadLatest(profileId: Id<UserDataItem>, size: number): Promise<UserPlaylogItem[]> {
    const stmt = sql
      .select("music_id", "score", "level","user_play_date")
      .from("cm_user_playlog")
      .where("profile_id", profileId)
      .limit(size).order("user_play_date DESC");

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }
}
