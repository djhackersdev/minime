import { LoadRewardTableRequest } from "../request/loadRewardTable";
import { LoadRewardTableResponse } from "../response/loadRewardTable";
import { Repositories } from "../repo";

export function loadReward(
  w: Repositories,
  req: LoadRewardTableRequest
): LoadRewardTableResponse {
  return {
    type: "load_reward_table_res",
  };
}
