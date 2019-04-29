import { RequestCode } from "./_defs";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { LoadGarageRequest } from "../request/loadGarage";

loadGarage.msgCode = 0x0090 as RequestCode;
loadGarage.msgLen = 0x0010;

export function loadGarage(buf: Buffer): LoadGarageRequest {
  return {
    type: "load_garage_req",
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
    fetchOffset: buf.readUInt8(0x0008),
    field_000A: buf.readUInt16LE(0x000a),
  };
}
