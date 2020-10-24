import { CheckTeamNameRequest } from "../request/checkTeamName";

checkTeamName1.msgCode = 0x00a2;
checkTeamName1.msgLen = 0x0040;

export function checkTeamName1(buf: Buffer): CheckTeamNameRequest {
  return { type: "check_team_name_req" };
}

checkTeamName2.msgCode = 0x0097;
checkTeamName2.msgLen = 0x0040;

export function checkTeamName2(buf: Buffer): CheckTeamNameRequest {
  return { type: "check_team_name_req" };
}
