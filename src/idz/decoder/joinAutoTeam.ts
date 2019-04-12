import { RequestCode } from "./_defs";
import { JoinAutoTeamRequest } from "../request/joinAutoTeam";

joinAutoTeam.msgCode = 0x007b as RequestCode;
joinAutoTeam.msgLen = 0x0010;

export function joinAutoTeam(buf: Buffer): JoinAutoTeamRequest {
  return {
    type: "join_auto_team_req",
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt8(0x000c),
  };
}
