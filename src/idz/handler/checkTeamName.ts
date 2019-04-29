import { CheckTeamNameRequest } from "../request/checkTeamName";
import { CheckTeamNameResponse } from "../response/checkTeamName";
import { Repositories } from "../repo";

export function checkTeamName(
  w: Repositories,
  req: CheckTeamNameRequest
): CheckTeamNameResponse {
  return {
    type: "check_team_name_res",
    status: 0,
  };
}
