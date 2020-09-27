import { DiscoverProfileRequest } from "../request/discoverProfile";
import { DiscoverProfileResponse } from "../response/discoverProfile";
import { Repositories } from "../repo";

export async function discoverProfile(
  w: Repositories,
  req: DiscoverProfileRequest
): Promise<DiscoverProfileResponse> {
  const profileId = await w.profile().peek(req.aimeId, req.version);

  return {
    type: "discover_profile_res",
    exists: profileId !== undefined,
  };
}
