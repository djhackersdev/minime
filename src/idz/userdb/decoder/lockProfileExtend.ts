import { LockProfileExtendRequest } from "../request/lockProfileExtend";
import { AimeId } from "../../../model";
import { readAsciiStr } from "../../util/bin";

lockProfileExtend1.msgCode = 0x006d;
lockProfileExtend1.msgLen = 0x0020;

export function lockProfileExtend1(buf: Buffer): LockProfileExtendRequest {
  return {
    type: "lock_profile_extend_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    luid: readAsciiStr(buf, 0x0008, 0x0020),
  };
}

lockProfileExtend2.msgCode = 0x0069;
lockProfileExtend2.msgLen = 0x0020;

export function lockProfileExtend2(buf: Buffer): LockProfileExtendRequest {
  return {
    type: "lock_profile_extend_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    luid: buf.slice(0x0008, buf.indexOf("\0")).toString("ascii"),
  };
}
