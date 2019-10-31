import { GameRankingJson } from "../proto/gameRanking";

export interface GetGameRankingResponse {
  /** Long */
  type: string;

  // No length parameter..?

  gameRankingList: GameRankingJson[];
}
