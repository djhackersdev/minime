import { ExtId } from "../model/base";
import { Team } from "../model/team";

export interface CreateTeamResponse {
  type: "create_team_res";
  status: number; // 0 is success, 1 is failure
  teamExtId: ExtId<Team>;
}
