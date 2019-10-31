import { Crush, readBoolean, writeObject } from "./base";
import { UserItemItem } from "../model/userItem";

export type UserItemJson = Crush<UserItemItem>;

export function readUserItem(json: UserItemJson): UserItemItem {
  return {
    itemKind: parseInt(json.itemKind),
    itemId: parseInt(json.itemId),
    stock: parseInt(json.stock),
    isValid: readBoolean(json.isValid),
  };
}

export function writeUserItem(obj: UserItemItem): UserItemJson {
  return writeObject(obj);
}
