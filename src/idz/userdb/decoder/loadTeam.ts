import { LoadTeamRequest } from "../request/loadTeam";
import { ExtId } from "../model/base";
import { Team } from "../model/team";

loadTeam1.msgCode = 0x0077;
loadTeam1.msgLen = 0x0010;

export function loadTeam1(buf: Buffer): LoadTeamRequest {
  const extId = buf.readUInt32LE(0x0008);

  return {
    type: "load_team_req",
    aimeId: buf.readUInt32LE(0x0004),
    version: 1,
    teamExtId: extId !== 0xffffffff ? (extId as ExtId<Team>) : undefined,
  };
}

loadTeam2.msgCode = 0x0073;
loadTeam2.msgLen = 0x0010;

export function loadTeam2(buf: Buffer): LoadTeamRequest {
  const extId = buf.readUInt32LE(0x0008);

  return {
    type: "load_team_req",
    aimeId: buf.readUInt32LE(0x0004),
    version: 2,
    teamExtId: extId !== 0xffffffff ? (extId as ExtId<Team>) : undefined,
  };
}
