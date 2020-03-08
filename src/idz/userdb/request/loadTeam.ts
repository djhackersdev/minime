import { ExtId } from "../model/base";
import { Team } from "../model/team";

export interface LoadTeamRequest {
  type: "load_team_req";
  aimeId: number;
  teamExtId?: ExtId<Team>;
}
