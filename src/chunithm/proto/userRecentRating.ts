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
