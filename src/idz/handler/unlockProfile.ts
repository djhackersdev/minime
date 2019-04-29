import { UnlockProfileRequest } from "../request/unlockProfile";
import { UnlockProfileResponse } from "../response/unlockProfile";
import { Repositories } from "../repo";

export function unlockProfile(
  w: Repositories,
  req: UnlockProfileRequest
): UnlockProfileResponse {
  return {
    type: "unlock_profile_res",
    status: 1,
  };
}
