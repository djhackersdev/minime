import { UserPlaylogItem } from "./../model/userPlaylog";
import { Crush, writeObject } from "./base";
import { UserRecentRatingItem } from "../model/userRecentRating";

export type UserRecentRatingJson = Crush<UserRecentRatingItem>;

export function readUserRecentRating(
  json: UserRecentRatingJson
): UserRecentRatingItem {
  return {
    musicId: parseInt(json.musicId),
    difficultId: parseInt(json.difficultId),
    romVersionCode: parseInt(json.romVersionCode),
    score: parseInt(json.score),
  };
}

export function writeUserRecentRating(
  obj: UserRecentRatingItem
): UserRecentRatingJson {
  return writeObject(obj);
}

export function writeUserRecentRatingFromLog(
  obj: UserPlaylogItem
): UserRecentRatingJson {
  return {
    musicId: obj.musicId.toString(),
    difficultId: obj.level.toString(),
    // game version not saved in play log, just return a fixed version now
    romVersionCode: "1030000",
    score: obj.score.toString(),
  };
}
