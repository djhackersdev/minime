import { UpdateTeamPointsRequest } from "../request/updateTeamPoints";

updateTeamPoints1.msgCode = 0x0081;
updateTeamPoints1.msgLen = 0x0010;

export function updateTeamPoints1(buf: Buffer): UpdateTeamPointsRequest {
  return {
    type: "update_team_points_req",
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
  };
}

updateTeamPoints2.msgCode = 0x007b;
updateTeamPoints2.msgLen = 0x0010;

export function updateTeamPoints2(buf: Buffer): UpdateTeamPointsRequest {
  return {
    type: "update_team_points_req",
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
  };
}
