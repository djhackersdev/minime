import { Crush, writeObject } from "./base";
import { UserGameOptionItem } from "../model/userGameOption";

export type UserGameOptionJson = Crush<UserGameOptionItem>;

export function readUserGameOption(
  json: UserGameOptionJson
): UserGameOptionItem {
  return {
    bgInfo: parseInt(json.bgInfo),
    fieldColor: parseInt(json.fieldColor),
    guideSound: parseInt(json.guideSound),
    soundEffect: parseInt(json.soundEffect),
    guideLine: parseInt(json.guideLine),
    speed: parseInt(json.speed),
    optionSet: parseInt(json.optionSet),
    matching: parseInt(json.matching),
    judgePos: parseInt(json.judgePos),
    rating: parseInt(json.rating),
    judgeJustice: parseInt(json.judgeJustice),
    judgeAttack: parseInt(json.judgeAttack),
    headphone: parseInt(json.headphone),
    playerLevel: parseInt(json.playerLevel),
    successTap: parseInt(json.successTap),
    successExTap: parseInt(json.successExTap),
    successSlideHold: parseInt(json.successSlideHold),
    successAir: parseInt(json.successAir),
    successFlick: parseInt(json.successFlick),
    successSkill: parseInt(json.successSkill),
    successTapTimbre: parseInt(json.successTapTimbre),
    privacy: parseInt(json.privacy),
  };
}

export function writeUserGameOption(
  obj: UserGameOptionItem
): UserGameOptionJson {
  return writeObject(obj);
}
