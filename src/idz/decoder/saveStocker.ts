import { bitmap } from "./_bitmap";
import { chara } from "./_chara";
import { CarSelector } from "../model/car";
import { SaveStockerRequest } from "../request/saveStocker";
import { AimeId } from "../../model";

saveStocker.msgCode = 0x00a6;
saveStocker.msgLen = 0x00c0;

export function saveStocker(buf: Buffer): SaveStockerRequest {
  return {
    type: "save_stocker_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,

    backgrounds: bitmap(buf.slice(0x0008, 0x002c)),
    selectedCar: buf.readUInt16LE(0x009c) as CarSelector,
    chara: chara(buf.slice(0x009e, 0x00b2)),
  };
}
