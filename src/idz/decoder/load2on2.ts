import { RequestCode } from "./_defs";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Team } from "../model/team";
import { Load2on2Request } from "../request/load2on2";

load2on2.msgCode = 0x00b0 as RequestCode;
load2on2.msgLen = 0x0010;

export function load2on2(buf: Buffer): Load2on2Request {
  return {
    type: "load_2on2_req",
    field_0002: buf.readUInt16LE(0x0002),
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
    teamId: buf.readUInt32LE(0x0008) as ExtId<Team>,
  };
}
