import { CheckTeamNameRequest } from "../request/checkTeamName";

checkTeamName.msgCode = 0x00a2;
checkTeamName.msgLen = 0x0040;

export function checkTeamName(buf: Buffer): CheckTeamNameRequest {
  return { type: "check_team_name_req" };
}
