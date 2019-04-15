import { bitmap } from "./_bitmap";
import { chara } from "./_chara";
import { RequestCode } from "./_defs";
import { BackgroundCode, Id } from "../model/base";
import { CarSelector } from "../model/car";
import { Profile } from "../model/profile";
import { SaveStockerRequest } from "../request/saveStocker";

saveStocker.msgCode = 0x00a6 as RequestCode;
saveStocker.msgLen = 0x00c0;

export function saveStocker(buf: Buffer): SaveStockerRequest {
  return {
    type: "save_stocker_req",
    profileId: buf.readUInt32LE(0x0004) as Id<Profile>,

    backgrounds: bitmap(buf.slice(0x0008, 0x002c)) as BackgroundCode[],
    selectedCar: buf.readUInt16LE(0x009c) as CarSelector,
    chara: chara(buf.slice(0x009e, 0x00b2)),
  };
}
