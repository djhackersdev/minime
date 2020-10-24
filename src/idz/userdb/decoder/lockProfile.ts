import { readAsciiStr } from "../../util/bin";
import { LockProfileRequest } from "../request/lockProfile";

lockProfile1.msgCode = 0x0069;
lockProfile1.msgLen = 0x0020;

export function lockProfile1(buf: Buffer): LockProfileRequest {
  return {
    type: "lock_profile_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: readAsciiStr(buf, 0x0008, 0x0018),
    field_0018: buf.readUInt16LE(0x0018),
  };
}

lockProfile2.msgCode = 0x0065;
lockProfile2.msgLen = 0x0020;

export function lockProfile2(buf: Buffer): LockProfileRequest {
  return {
    type: "lock_profile_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: readAsciiStr(buf, 0x0008, 0x0018),
    field_0018: buf.readUInt16LE(0x0018),
  };
}
