import { Team } from "../model/team";

export interface TeamMember {
  name: string;
  lv: number;
  monthPoints: number;
}

export interface BaseTeamResponse {
  team: Team;
  members: TeamMember[];
  // giga TODO
}
