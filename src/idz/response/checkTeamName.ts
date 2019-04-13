export interface CheckTeamNameResponse {
  type: "check_team_name_res";
  status: number; // Anything other than 4 is success
}
