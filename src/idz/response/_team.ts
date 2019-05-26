import { Team, TeamMember } from "../model/team";

export interface BaseTeamResponse {
  team: Team;
  members: TeamMember[];
  // giga TODO
}
