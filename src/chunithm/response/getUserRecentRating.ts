import { UserRecentRatingJson } from "../proto/userRecentRating";

export interface GetUserRecentRatingResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  userRecentRatingList: UserRecentRatingJson[];
}
