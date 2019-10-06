import { CreateAutoTeamRequest } from "../request/createAutoTeam";
import { AimeId } from "../../model";

createAutoTeam.msgCode = 0x007b;
createAutoTeam.msgLen = 0x0010;

export function createAutoTeam(buf: Buffer): CreateAutoTeamRequest {
  return {
    type: "create_auto_team_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt8(0x000c),
  };
}
