import { CheckTeamNameRequest } from "../request/checkTeamName";
import { CheckTeamNameResponse } from "../response/checkTeamName";
import { World } from "../world";

export function checkTeamName(
  w: World,
  req: CheckTeamNameRequest
): CheckTeamNameResponse {
  return {
    type: "check_team_name_res",
    status: 0,
  };
}
