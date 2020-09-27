import { SaveTimeAttackRequest } from "../request/saveTimeAttack";
import { SaveTimeAttackResponse } from "../response/saveTimeAttack";
import { Repositories } from "../repo";

export async function saveTimeAttack(
  w: Repositories,
  req: SaveTimeAttackRequest
): Promise<SaveTimeAttackResponse> {
  // Non time-attack credits still call this method, but they pass some
  // bullshit payload that we need to ignore.

  if (req.payload.totalTime > 0) {
    // Override client time since we might be doing some maintenance window
    // avoidance time warping stuff

    const now = new Date();
    const profileId = await w.profile().find(req.aimeId, req.version);

    await w.timeAttack().save(profileId, { ...req.payload, timestamp: now });
  }

  return {
    type: "save_time_attack_res",
  };
}
