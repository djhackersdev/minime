import { LoadGeneralRewardRequest } from "../request/loadGeneralReward";
import { GenericResponse } from "../response/generic";
import { LoadGeneralRewardResponse } from "../response/loadGeneralReward";
import { World } from "../world";

export function loadGeneralReward(
  w: World,
  req: LoadGeneralRewardRequest
): LoadGeneralRewardResponse | GenericResponse {
  // A non-generic response is also accepted, but why bother
  return { type: "generic_res" };
}
