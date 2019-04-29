import { DiscoverProfileRequest } from "../request/discoverProfile";
import { DiscoverProfileResponse } from "../response/discoverProfile";
import { Repositories } from "../repo";

export async function discoverProfile(
  w: Repositories,
  req: DiscoverProfileRequest
): Promise<DiscoverProfileResponse> {
  return {
    type: "discover_profile_res",
    exists: await w.profile().discoverByAimeId(req.aimeId),
  };
}
