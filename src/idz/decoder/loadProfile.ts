import { RequestCode } from "../defs";
import { LoadProfileRequest } from "../request/loadProfile";

loadProfile.msgCode = 0x0067 as RequestCode;
loadProfile.msgLen = 0x0020;

export function loadProfile(buf: Buffer): LoadProfileRequest {
  return {
    type: "load_profile_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
  };
}
