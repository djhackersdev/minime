import { SaveTimeAttackRequest } from "../request/saveTimeAttack";
import { SaveTimeAttackResponse } from "../response/saveTimeAttack";
import { Repositories } from "../repo";

export async function saveTimeAttack(
  w: Repositories,
  req: SaveTimeAttackRequest
): Promise<SaveTimeAttackResponse> {
  // Override client time since we might be doing some maintenance window
  // avoidance time warping stuff

  await w
    .timeAttack()
    .save(req.profileId, { ...req.payload, timestamp: new Date() });

  return {
    type: "save_time_attack_res",
  };
}
