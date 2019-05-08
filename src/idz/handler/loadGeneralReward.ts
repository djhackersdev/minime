import { LoadGeneralRewardRequest } from "../request/loadGeneralReward";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export function loadGeneralReward(
  w: Repositories,
  req: LoadGeneralRewardRequest
): GenericResponse {
  // A version-specific response is also accepted. Format TBD.
  return { type: "generic_res" };
}
