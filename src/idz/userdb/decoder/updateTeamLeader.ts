import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { UpdateTeamLeaderRequest } from "../request/updateTeamLeader";
import { AimeId } from "../../../model";
import { readAsciiStr } from "../../util/bin";

updateTeamLeader.msgCode = 0x008a;
updateTeamLeader.msgLen = 0x0020;

export function updateTeamLeader(buf: Buffer): UpdateTeamLeaderRequest {
  return {
    type: "update_team_leader_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    teamExtId: buf.readUInt32LE(0x0008) as ExtId<Team>,
    field_000C: readAsciiStr(buf, 0x000c, 0x0020),
  };
}
