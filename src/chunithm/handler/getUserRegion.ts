import { Repositories } from "../repo";
import { GetUserRegionRequest } from "../request/getUserRegion";
import { GetUserRegionResponse } from "../response/getUserRegion";

export default async function getUserRegion(
  rep: Repositories,
  req: GetUserRegionRequest
): Promise<GetUserRegionResponse> {
  return {
    userId: req.userId,
    length: "0",
    userRegionList: [
      // Doesn't get saved
    ],
  };
}
