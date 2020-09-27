import { LockProfileExtendRequest } from "../request/lockProfileExtend";
import { AimeId } from "../../../model";
import { readAsciiStr } from "../../util/bin";

lockProfileExtend.msgCode = 0x006d;
lockProfileExtend.msgLen = 0x0020;

export function lockProfileExtend(buf: Buffer): LockProfileExtendRequest {
  return {
    type: "lock_profile_extend_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    luid: readAsciiStr(buf, 0x0008, 0x0020),
  };
}
