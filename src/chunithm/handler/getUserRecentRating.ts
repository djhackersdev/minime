import { Repositories } from "../repo";
import { GetUserRecentRatingRequest } from "../request/getUserRecentRating";
import { GetUserRecentRatingResponse } from "../response/getUserRecentRating";
import { readAimeId } from "../proto/base";
import { writeUserRecentRating } from "../proto/userRecentRating";

export default async function getUserRecentRating(
  rep: Repositories,
  req: GetUserRecentRatingRequest
): Promise<GetUserRecentRatingResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  // Return recent 30 plays to calculate rating
  const items = await rep.userRecentRating().load(profileId);

  return {
    userId: req.userId,
    length: items.length.toString(),
    userRecentRatingList: items.map(writeUserRecentRating),
  };
}
