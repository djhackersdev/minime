import { Crush, readDate, writeObject } from "./base";
import { UserRegionItem } from "../model/userRegion";

export type UserRegionJson = Crush<UserRegionItem>;

export function readUserRegion(json: UserRegionJson): UserRegionItem {
  return {
    regionId: parseInt(json.regionId),
    playCount: parseInt(json.playCount),
    created: readDate(json.created),
  };
}

export function writeUserRegion(obj: UserRegionItem): UserRegionJson {
  return writeObject(obj);
}
