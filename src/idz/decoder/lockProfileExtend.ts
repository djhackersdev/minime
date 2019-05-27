import { RequestCode } from "./_defs";
import { LockProfileExtendRequest } from "../request/lockProfileExtend";
import { AimeId } from "../../model";

lockProfileExtend.msgCode = 0x006d as RequestCode;
lockProfileExtend.msgLen = 0x0020;

export function lockProfileExtend(buf: Buffer): LockProfileExtendRequest {
  return {
    type: "lock_profile_extend_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    luid: buf.slice(0x0008, buf.indexOf("\0")).toString("ascii"),
  };
}
