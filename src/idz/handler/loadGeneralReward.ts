import { LoadGeneralRewardRequest } from "../request/loadGeneralReward";
import { GenericResponse } from "../response/generic";
import { LoadGeneralRewardResponse } from "../response/loadGeneralReward";
import { Repositories } from "../repo";

export function loadGeneralReward(
  w: Repositories,
  req: LoadGeneralRewardRequest
): LoadGeneralRewardResponse | GenericResponse {
  // A non-generic response is also accepted, but why bother
  return { type: "generic_res" };
}
