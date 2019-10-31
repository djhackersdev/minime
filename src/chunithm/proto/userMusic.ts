import { Crush, readBoolean, writeObject } from "./base";
import { UserMusicDetailItem } from "../model/userMusic";

/**
 * Chart high score object. Saved as a flat list when the client saves new
 * scores, loaded in groups when a player's high scores are loaded.
 */
export type UserMusicDetailJson = Crush<UserMusicDetailItem>;

/**
 * Grouping of `UserMusicDetailItem` objects, used when scores are loaded.
 * Scores are grouped by `musicId`.
 */
export interface UserMusicJson {
  /** Integer, number of sub-objects in this object */
  length: string;

  /** Scores for this music ID */
  userMusicDetailList: UserMusicDetailJson[];
}

export function readUserMusicDetail(
  json: UserMusicDetailJson
): UserMusicDetailItem {
  return {
    musicId: parseInt(json.musicId),
    level: parseInt(json.level),
    playCount: parseInt(json.playCount),
    scoreMax: parseInt(json.scoreMax),
    resRequestCount: parseInt(json.resRequestCount),
    resAcceptCount: parseInt(json.resAcceptCount),
    resSuccessCount: parseInt(json.resSuccessCount),
    missCount: parseInt(json.missCount),
    maxComboCount: parseInt(json.maxComboCount),
    isFullCombo: readBoolean(json.isFullCombo),
    isAllJustice: readBoolean(json.isAllJustice),
    isSuccess: readBoolean(json.isSuccess),
    fullChain: parseInt(json.fullChain),
    maxChain: parseInt(json.maxChain),
    scoreRank: parseInt(json.scoreRank),
    isLock: readBoolean(json.isLock),
  };
}

export function writeUserMusicDetail(
  obj: UserMusicDetailItem
): UserMusicDetailJson {
  return writeObject(obj);
}
