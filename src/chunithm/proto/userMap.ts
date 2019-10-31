import { Crush, readBoolean, writeObject } from "./base";
import { UserMapItem } from "../model/userMap";

export type UserMapJson = Crush<UserMapItem>;

export function readUserMap(json: UserMapJson): UserMapItem {
  return {
    mapId: parseInt(json.mapId),
    position: parseInt(json.position),
    isClear: readBoolean(json.isClear),
    areaId: parseInt(json.areaId),
    routeNumber: parseInt(json.routeNumber),
    eventId: parseInt(json.eventId),
    rate: parseInt(json.rate),
    statusCount: parseInt(json.statusCount),
    isValid: readBoolean(json.isValid),
  };
}

export function writeUserMap(obj: UserMapItem): UserMapJson {
  return writeObject(obj);
}
