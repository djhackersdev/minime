import { LoadGachaRequest } from "../request/loadGacha";
import { AimeId } from "../../model";

loadGacha.msgCode = 0x00c1;
loadGacha.msgLen = 0x0010;

export function loadGacha(buf: Buffer): LoadGachaRequest {
  return {
    type: "load_gacha_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}
