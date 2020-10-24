import { CreateAutoTeamRequest } from "../request/createAutoTeam";
import { AimeId } from "../../../model";

createAutoTeam1.msgCode = 0x007b;
createAutoTeam1.msgLen = 0x0010;

export function createAutoTeam1(buf: Buffer): CreateAutoTeamRequest {
  return {
    type: "create_auto_team_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt8(0x000c),
  };
}

createAutoTeam2.msgCode = 0x0077;
createAutoTeam2.msgLen = 0x0010;

export function createAutoTeam2(buf: Buffer): CreateAutoTeamRequest {
  return {
    type: "create_auto_team_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt8(0x000c),
  };
}
