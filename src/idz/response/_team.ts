export interface TeamMember {
  name: string;
  lv: number;
  monthPoints: number;
}

export interface BaseTeamResponse {
  name: string;
  members: TeamMember[];
  // giga TODO
}
