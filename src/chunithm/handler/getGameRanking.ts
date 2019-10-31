import { Repositories } from "../repo";
import { GetGameRankingRequest } from "../request/getGameRanking";
import { GetGameRankingResponse } from "../response/getGameRanking";

export default async function getGameRanking(
  rep: Repositories,
  req: GetGameRankingRequest
): Promise<GetGameRankingResponse> {
  return {
    type: req.type,
    gameRankingList: [],
  };
}
