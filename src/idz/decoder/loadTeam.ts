import { RequestCode } from "../defs";
import { LoadTeamRequest } from "../request/loadTeam";

loadTeam.msgCode = 0x0077 as RequestCode;
loadTeam.msgLen = 0x0010;

export function loadTeam(buf: Buffer): LoadTeamRequest {
  return {
    type: "load_team_req",
    profileId: buf.readUInt32LE(0x0004),
    teamId: buf.readUInt32LE(0x0008),
  };
}
