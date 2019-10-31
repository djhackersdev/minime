import { Repositories } from "../repo";
import { GetUserRecentRatingRequest } from "../request/getUserRecentRating";
import { GetUserRecentRatingResponse } from "../response/getUserRecentRating";

export default async function getUserRecentRating(
  rep: Repositories,
  req: GetUserRecentRatingRequest
): Promise<GetUserRecentRatingResponse> {
  // I don't really know what subset of data to return here.

  return {
    userId: req.userId,
    length: "0",
    userRecentRatingList: [],
  };
}
