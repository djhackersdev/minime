import iconv = require("iconv-lite");

import { RequestCode } from "./_defs";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { CreateTeamRequest } from "../request/createTeam";

createTeam.msgCode = 0x0071 as RequestCode;
createTeam.msgLen = 0x0050;

export function createTeam(buf: Buffer): CreateTeamRequest {
  return {
    type: "create_team_req",
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
    teamName: iconv.decode(buf.slice(0x0008, 0x0028), "shift_jis"),
    field_0028: buf.readUInt16LE(0x0028),
    field_002C: buf.readUInt32LE(0x002c),
    nameBg: buf.readUInt8(0x0030),
    field_0032: buf.readUInt16LE(0x0032),
    prevTeamId: buf.readUInt32LE(0x0034),
    field_0038: buf.slice(0x0038, 0x0045),
  };
}
