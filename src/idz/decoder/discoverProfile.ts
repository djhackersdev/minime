import { DiscoverProfileRequest } from "../request/discoverProfile";
import { AimeId } from "../../model";

discoverProfile.msgCode = 0x006b;
discoverProfile.msgLen = 0x0010;

export function discoverProfile(buf: Buffer): DiscoverProfileRequest {
  return {
    type: "discover_profile_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}
