import { SaveTimeAttackRequest } from "../request/saveTimeAttack";
import { SaveTimeAttackResponse } from "../response/saveTimeAttack";
import { Repositories } from "../repo";

export async function saveTimeAttack(
  w: Repositories,
  req: SaveTimeAttackRequest
): Promise<SaveTimeAttackResponse> {
  await w.timeAttack().save(req.profileId, req.payload);

  return {
    type: "save_time_attack_res",
  };
}
