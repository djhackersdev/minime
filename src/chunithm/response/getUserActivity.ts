import { UserActivityJson } from "../proto/userActivity";

export interface GetUserActivityResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  /** Integer, round-trip from request */
  kind: string;

  userActivityList: UserActivityJson[];
}
