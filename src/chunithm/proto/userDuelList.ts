import { Crush, readBoolean, readDate, writeObject } from "./base";
import { UserDuelListItem } from "../model/userDuelList";

export type UserDuelListJson = Crush<UserDuelListItem>;

export function readUserDuelList(
  json: UserDuelListJson
): UserDuelListItem {
  return {
    duelId: parseInt(json.duelId),
    progress: parseInt(json.progress),
    point: parseInt(json.point),
    isClear: readBoolean(json.isClear),
    lastPlayDate: readDate(json.lastPlayDate),
    param1: parseInt(json.param1),
    param2: parseInt(json.param2),
    param3: parseInt(json.param3),
    param4: parseInt(json.param4),
  };
}

export function writeUserDuelList(
  obj: UserDuelListItem
): UserDuelListJson {
  return writeObject(obj);
}
