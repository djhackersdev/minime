import { bitmap } from "./_bitmap";
import { chara } from "./_chara";
import { StampCode } from "../model/base";
import { CarSelector } from "../model/car";
import { SaveStockerRequest } from "../request/saveStocker";
import { AimeId } from "../../../model";

saveStocker1.msgCode = 0x00a6;
saveStocker1.msgLen = 0x00c0;

export function saveStocker1(buf: Buffer): SaveStockerRequest {
  return {
    type: "save_stocker_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    backgrounds: bitmap(buf.slice(0x0008, 0x002c)),
    selectedCar: buf.readUInt16LE(0x009c) as CarSelector,
    chara: chara(buf.slice(0x009e, 0x00b2)),
  };
}

saveStocker2.msgCode = 0x009b;
saveStocker2.msgLen = 0x0110;

export function saveStocker2(buf: Buffer): SaveStockerRequest {
  return {
    type: "save_stocker_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
    backgrounds: bitmap(buf.slice(0x0008, 0x0034)),
    selectedCar: buf.readUInt16LE(0x009c) as CarSelector,
    chara: chara(buf.slice(0x009e, 0x00b2)),
    myChara: bitmap(buf.slice(0x0034, 0x098)),
    selectedStamps: {
      stamp01: buf.readUInt16LE(0x00da) as StampCode,
      stamp02: buf.readUInt16LE(0x00dc) as StampCode,
      stamp03: buf.readUInt16LE(0x00de) as StampCode,
      stamp04: buf.readUInt16LE(0x00e0) as StampCode,
    },
    stamps: bitmap(buf.slice(0x00b3, 0x00d9)),
  };
}
