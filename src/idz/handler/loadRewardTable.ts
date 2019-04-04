import { LoadRewardTableRequest } from "../request/loadRewardTable";
import { LoadRewardTableResponse } from "../response/loadRewardTable";
import { World } from "../world";

export function loadReward(
  w: World,
  req: LoadRewardTableRequest
): LoadRewardTableResponse {
  return {
    type: "load_reward_table_res",
  };
}
