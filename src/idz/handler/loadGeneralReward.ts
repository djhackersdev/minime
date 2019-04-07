import { LoadGeneralRewardRequest } from "../request/loadGeneralReward";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function loadGeneralReward(
  w: World,
  req: LoadGeneralRewardRequest
): GenericResponse {
  // A non-generic response is also accepted, but why bother
  return { type: "generic_res" };
}
