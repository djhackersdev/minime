import { Crush, writeObject } from "./base";
import { UserDataExItem } from "../model/userDataEx";

export type UserDataExJson = Crush<UserDataExItem>;

export function readUserDataEx(json: UserDataExJson): UserDataExItem {
  return {
    compatibleCmVersion: json.compatibleCmVersion,
    medal: parseInt(json.medal),
    mapIconId: parseInt(json.mapIconId),
    voiceId: parseInt(json.voiceId),
    ext1: parseInt(json.ext1),
    ext2: parseInt(json.ext2),
    ext3: parseInt(json.ext3),
    ext4: parseInt(json.ext4),
    ext5: parseInt(json.ext5),
    ext6: parseInt(json.ext6),
    ext7: parseInt(json.ext7),
    ext8: parseInt(json.ext8),
    ext9: parseInt(json.ext9),
    ext10: parseInt(json.ext10),
    ext11: parseInt(json.ext11),
    ext12: parseInt(json.ext12),
    ext13: parseInt(json.ext13),
    ext14: parseInt(json.ext14),
    ext15: parseInt(json.ext15),
    ext16: parseInt(json.ext16),
    ext17: parseInt(json.ext17),
    ext18: parseInt(json.ext18),
    ext19: parseInt(json.ext19),
    ext20: parseInt(json.ext20),
    extStr1: json.extStr1,
    extStr2: json.extStr2,
    extStr3: json.extStr3,
    extStr4: json.extStr4,
    extStr5: json.extStr5,
    extLong1: BigInt(json.extLong1),
    extLong2: BigInt(json.extLong2),
    extLong3: BigInt(json.extLong3),
    extLong4: BigInt(json.extLong4),
    extLong5: BigInt(json.extLong5),
  };
}

export function writeUserDataEx(obj: UserDataExItem): UserDataExJson {
  return writeObject(obj);
}
