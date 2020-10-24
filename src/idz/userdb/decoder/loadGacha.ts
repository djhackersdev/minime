import { LoadGachaRequest } from "../request/loadGacha";
import { AimeId } from "../../../model";

loadGacha1.msgCode = 0x00c1;
loadGacha1.msgLen = 0x0010;

export function loadGacha1(buf: Buffer): LoadGachaRequest {
  return {
    type: "load_gacha_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}

loadGacha2.msgCode = 0x00af;
loadGacha2.msgLen = 0x0010;

export function loadGacha2(buf: Buffer): LoadGachaRequest {
  return {
    type: "load_gacha_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}
