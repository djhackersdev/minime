import { LockAccountRequest } from "../request/lockProfile";
import { LockProfileResponse } from "../response/lockProfile";
import { World } from "../world";

export function lockProfile(
  w: World,
  req: LockAccountRequest
): LockProfileResponse {
  return {
    type: "lock_profile_res",
    status: "unlocked",
    field_001A: -1,
    lockExpiry: new Date(Date.now() + 3600000),
  };
}
