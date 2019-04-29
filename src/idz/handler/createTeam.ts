import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { CreateTeamRequest } from "../request/createTeam";
import { CreateTeamResponse } from "../response/createTeam";
import { Repositories } from "../repo";

export function createTeam(
  w: Repositories,
  req: CreateTeamRequest
): CreateTeamResponse {
  return {
    type: "create_team_res",
    status: 0,
    teamId: 3 as ExtId<Team>,
  };
}
