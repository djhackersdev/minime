import { UnlockProfileRequest } from "../request/unlockProfile";
import { UnlockProfileResponse } from "../response/unlockProfile";
import { World } from "../world";

export function unlockProfile(
  w: World,
  req: UnlockProfileRequest
): UnlockProfileResponse {
  return {
    type: "unlock_profile_res",
    status: 1,
  };
}
