import { Crush, readDate, writeObject } from "./base";
import { UserChargeItem } from "../model/userCharge";

export type UserChargeJson = Crush<UserChargeItem>;

export function readUserCharge(json: UserChargeJson): UserChargeItem {
  return {
    chargeId: parseInt(json.chargeId),
    stock: parseInt(json.stock),
    purchaseDate: readDate(json.purchaseDate),
    validDate: readDate(json.validDate),
    param1: parseInt(json.param1),
    param2: parseInt(json.param2),
    paramDate: readDate(json.paramDate),
  };
}

export function writeUserCharge(obj: UserChargeItem): UserChargeJson {
  return writeObject(obj);
}
