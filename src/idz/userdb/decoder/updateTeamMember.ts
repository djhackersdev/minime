import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { UpdateTeamMemberRequest } from "../request/updateTeamMember";
import { AimeId } from "../../../model";

updateTeamMember1.msgCode = 0x0073;
updateTeamMember1.msgLen = 0x0010;

export function updateTeamMember1(buf: Buffer): UpdateTeamMemberRequest {
  return {
    type: "update_team_member_req",
    action: buf.readUInt8(0x0004) === 0 ? "add" : "remove",
    aimeId: buf.readUInt32LE(0x0008) as AimeId,
    version: 1,
    teamExtId: buf.readUInt32LE(0x000c) as ExtId<Team>,
  };
}

updateTeamMember2.msgCode = 0x006f;
updateTeamMember2.msgLen = 0x0010;

export function updateTeamMember2(buf: Buffer): UpdateTeamMemberRequest {
  return {
    type: "update_team_member_req",
    action: buf.readUInt8(0x0004) === 0 ? "add" : "remove",
    aimeId: buf.readUInt32LE(0x0008) as AimeId,
    version: 2,
    teamExtId: buf.readUInt32LE(0x000c) as ExtId<Team>,
  };
}
