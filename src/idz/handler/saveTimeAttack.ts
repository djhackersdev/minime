import { SaveTimeAttackRequest } from "../request/saveTimeAttack";
import { SaveTimeAttackResponse } from "../response/saveTimeAttack";
import { Repositories } from "../repo";

export async function saveTimeAttack(
  w: Repositories,
  req: SaveTimeAttackRequest
): Promise<SaveTimeAttackResponse> {
  if (req.payload.totalMsec > 0) {
    const existing = await w
      .timeAttack()
      .load(req.profileId, req.payload.courseId);

    if (existing === undefined || existing.totalMsec > req.payload.totalMsec) {
      await w.timeAttack().save(req.profileId, req.payload);
    }
  }

  return {
    type: "save_time_attack_res",
  };
}
