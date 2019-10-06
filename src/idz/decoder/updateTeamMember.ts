import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { UpdateTeamMemberRequest } from "../request/updateTeamMember";
import { AimeId } from "../../model";

updateTeamMember.msgCode = 0x0073;
updateTeamMember.msgLen = 0x0010;

export function updateTeamMember(buf: Buffer): UpdateTeamMemberRequest {
  return {
    type: "update_team_member_req",
    action: buf.readUInt8(0x0004) === 0 ? "add" : "remove",
    aimeId: buf.readUInt32LE(0x0008) as AimeId,
    teamExtId: buf.readUInt32LE(0x000c) as ExtId<Team>,
  };
}
