import { LockProfileRequest } from "../request/lockProfile";
import { LockProfileResponse } from "../response/lockProfile";
import { Repositories } from "../repo";

export function lockProfile(
  w: Repositories,
  req: LockProfileRequest
): LockProfileResponse {
  return {
    type: "lock_profile_res",
    status: "unlocked",
    field_001A: -1,
    lockExpiry: new Date(Date.now() + 3600000),
  };
}
