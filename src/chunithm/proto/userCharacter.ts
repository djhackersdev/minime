import { Crush, readBoolean, writeObject } from "./base";
import { UserCharacterItem } from "../model/userCharacter";

export type UserCharacterJson = Crush<UserCharacterItem>;

export function readUserCharacter(json: UserCharacterJson): UserCharacterItem {
  return {
    characterId: parseInt(json.characterId),
    playCount: parseInt(json.playCount),
    level: parseInt(json.level),
    skillId: parseInt(json.skillId),
    friendshipExp: parseInt(json.friendshipExp),
    isValid: readBoolean(json.isValid),
    isNewMark: readBoolean(json.isNewMark),
    param1: parseInt(json.param1),
    param2: parseInt(json.param2),
  };
}

export function writeUserCharacter(obj: UserCharacterItem): UserCharacterJson {
  return writeObject(obj);
}
