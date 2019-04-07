import { CheckRankRequest } from "../request/checkRank";
import { CheckRankResponse } from "../response/checkRank";
import { World } from "../world";

export function checkRank(w: World, req: CheckRankRequest): CheckRankResponse {
  return {
    type: "check_rank_res",
  };
}
