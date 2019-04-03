import { RequestCode } from "../defs";
import { CreateTeamRequest } from "../request/createTeam";

createTeam.msgCode = 0x007b as RequestCode;
createTeam.msgLen = 0x0010;

export function createTeam(buf: Buffer): CreateTeamRequest {
  return {
    type: "create_team_req",
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt8(0x000c),
  };
}
