import { Id } from "../model/base";
import { Team } from "../model/team";
import { CreateTeamRequest } from "../request/createTeam";
import { CreateTeamResponse } from "../response/createTeam";
import { World } from "../world";

export function createTeam(
  w: World,
  req: CreateTeamRequest
): CreateTeamResponse {
  return {
    type: "create_team_res",
    status: 0,
    teamId: 3 as Id<Team>,
  };
}
