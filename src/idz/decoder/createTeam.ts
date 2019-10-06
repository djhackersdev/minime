import iconv from "iconv-lite";

import { CreateTeamRequest } from "../request/createTeam";
import { AimeId } from "../../model";

createTeam.msgCode = 0x0071;
createTeam.msgLen = 0x0050;

export function createTeam(buf: Buffer): CreateTeamRequest {
  return {
    type: "create_team_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    teamName: iconv.decode(
      buf.slice(0x0008, buf.indexOf("\0", 0x0008)),
      "shift_jis"
    ),
    field_0028: buf.readUInt16LE(0x0028),
    field_002C: buf.readUInt32LE(0x002c),
    nameBg: buf.readUInt8(0x0030),
    field_0032: buf.readUInt16LE(0x0032),
    prevTeamId: buf.readUInt32LE(0x0034),
    pcbId: buf.slice(0x0038, buf.indexOf("\0", 0x0038)).toString("ascii"),
  };
}
