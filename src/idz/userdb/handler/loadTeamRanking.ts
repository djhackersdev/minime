import { LoadTeamRankingRequest } from "../request/loadTeamRanking";
import { LoadTeamRankingResponse } from "../response/loadTeamRanking";
import { Repositories } from "../repo";

export function loadTeamRanking(
  w: Repositories,
  req: LoadTeamRankingRequest
): LoadTeamRankingResponse {
  return {
    type: "load_team_ranking_res",
  };
}
