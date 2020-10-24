import { DiscoverProfileRequest } from "../request/discoverProfile";
import { AimeId } from "../../../model";

discoverProfile1.msgCode = 0x006b;
discoverProfile1.msgLen = 0x0010;

export function discoverProfile1(buf: Buffer): DiscoverProfileRequest {
  return {
    type: "discover_profile_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
  };
}

discoverProfile2.msgCode = 0x0067;
discoverProfile2.msgLen = 0x0010;

export function discoverProfile2(buf: Buffer): DiscoverProfileRequest {
  return {
    type: "discover_profile_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
  };
}
