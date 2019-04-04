import { RequestCode } from "../defs";
import { SaveStockerRequest } from "../request/saveStocker";

saveStocker.msgCode = 0x00a6 as RequestCode;
saveStocker.msgLen = 0x00c0;

export function saveStocker(buf: Buffer): SaveStockerRequest {
  return {
    type: "save_stocker_req",
    profileId: buf.readUInt32LE(0x0004),
  };
}
