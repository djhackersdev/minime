import { readAsciiStr } from "../../util/bin";
import { LockProfileRequest } from "../request/lockProfile";

lockProfile.msgCode = 0x0069;
lockProfile.msgLen = 0x0020;

export function lockProfile(buf: Buffer): LockProfileRequest {
  return {
    type: "lock_profile_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: readAsciiStr(buf, 0x0008, 0x0018),
    field_0018: buf.readUInt16LE(0x0018),
  };
}
