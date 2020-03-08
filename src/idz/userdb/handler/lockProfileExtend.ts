import { Repositories } from "../repo";
import { LockProfileExtendRequest } from "../request/lockProfileExtend";
import { LockProfileExtendResponse } from "../response/lockProfileExtend";

export function lockProfileExtend(
  w: Repositories,
  req: LockProfileExtendRequest
): LockProfileExtendResponse {
  return {
    type: "lock_profile_extend_res",
    status: 1,
  };
}
