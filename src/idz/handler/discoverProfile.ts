import { DiscoverProfileRequest } from "../request/discoverProfile";
import { DiscoverProfileResponse } from "../response/discoverProfile";
import { World } from "../world";

export function discoverProfile(
  w: World,
  req: DiscoverProfileRequest
): DiscoverProfileResponse {
  return {
    type: "discover_profile_res",
    exists: true,
  };
}
