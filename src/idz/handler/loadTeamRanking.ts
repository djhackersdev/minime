import { LoadTeamRankingRequest } from "../request/loadTeamRanking";
import { LoadTeamRankingResponse } from "../response/loadTeamRanking";
import { World } from "../world";

export function loadTeamRanking(
  w: World,
  req: LoadTeamRankingRequest
): LoadTeamRankingResponse {
  return {
    type: "load_team_ranking_res",
  };
}
