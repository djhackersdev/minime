import { RequestCode } from "./_defs";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { LockProfileExtendRequest } from "../request/lockProfileExtend";

lockProfileExtend.msgCode = 0x006d as RequestCode;
lockProfileExtend.msgLen = 0x0020;

export function lockProfileExtend(buf: Buffer): LockProfileExtendRequest {
  return {
    type: "lock_profile_extend_req",
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
    luid: buf.slice(0x0008, buf.indexOf("\0")).toString("ascii"),
  };
}
