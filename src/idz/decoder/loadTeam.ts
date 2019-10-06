import { LoadTeamRequest } from "../request/loadTeam";
import { ExtId } from "../model/base";
import { Team } from "../model/team";

loadTeam.msgCode = 0x0077;
loadTeam.msgLen = 0x0010;

export function loadTeam(buf: Buffer): LoadTeamRequest {
  const extId = buf.readUInt32LE(0x0008);

  return {
    type: "load_team_req",
    aimeId: buf.readUInt32LE(0x0004),
    teamExtId: extId !== 0xffffffff ? (extId as ExtId<Team>) : undefined,
  };
}
