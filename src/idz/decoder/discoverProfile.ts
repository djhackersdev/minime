import { RequestCode } from "./_defs";
import { AimeId } from "../model/base";
import { DiscoverProfileRequest } from "../request/discoverProfile";

discoverProfile.msgCode = 0x006b as RequestCode;
discoverProfile.msgLen = 0x0010;

export function discoverProfile(buf: Buffer): DiscoverProfileRequest {
  return {
    type: "discover_profile_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}
