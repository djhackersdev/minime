import { DiscoverProfileRequest } from "../request/discoverProfile";
import { DiscoverProfileResponse } from "../response/discoverProfile";
import { World } from "../world";

export async function discoverProfile(
  w: World,
  req: DiscoverProfileRequest
): Promise<DiscoverProfileResponse> {
  return {
    type: "discover_profile_res",
    exists: await w.profile().discoverByAimeId(req.aimeId),
  };
}
