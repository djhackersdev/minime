import { RequestCode } from "./_defs";
import { LoadGachaRequest } from "../request/loadGacha";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";

loadGacha.msgCode = 0x00c1 as RequestCode;
loadGacha.msgLen = 0x0010;

export function loadGacha(buf: Buffer): LoadGachaRequest {
  return {
    type: "load_gacha_req",
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
  };
}
