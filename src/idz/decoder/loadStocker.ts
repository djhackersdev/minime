import { RequestCode } from "./_defs";
import { Id } from "../model/base";
import { Profile } from "../model/profile";
import { LoadStockerRequest } from "../request/loadStocker";

loadStocker.msgCode = 0x00a7 as RequestCode;
loadStocker.msgLen = 0x0010;

export function loadStocker(buf: Buffer): LoadStockerRequest {
  return {
    type: "load_stocker_req",
    profileId: buf.readUInt32LE(0x0004) as Id<Profile>,
  };
}
