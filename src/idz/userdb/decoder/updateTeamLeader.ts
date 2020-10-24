import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { UpdateTeamLeaderRequest } from "../request/updateTeamLeader";
import { AimeId } from "../../../model";
import { readAsciiStr } from "../../util/bin";

updateTeamLeader1.msgCode = 0x008a;
updateTeamLeader1.msgLen = 0x0020;

export function updateTeamLeader1(buf: Buffer): UpdateTeamLeaderRequest {
  return {
    type: "update_team_leader_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    teamExtId: buf.readUInt32LE(0x0008) as ExtId<Team>,
    field_000C: readAsciiStr(buf, 0x000c, 0x0020),
  };
}

updateTeamLeader2.msgCode = 0x0083;
updateTeamLeader2.msgLen = 0x0020;

export function updateTeamLeader2(buf: Buffer): UpdateTeamLeaderRequest {
  return {
    type: "update_team_leader_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
    teamExtId: buf.readUInt32LE(0x0008) as ExtId<Team>,
    field_000C: readAsciiStr(buf, 0x000c, 0x0020),
  };
}
