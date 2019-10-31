import { UserMapJson } from "../proto/userMap";

export interface GetUserMapResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  userMapList: UserMapJson[];
}
