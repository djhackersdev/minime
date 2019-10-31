import { UserRegionJson } from "../proto/userRegion";

export interface GetUserRegionResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  userRegionList: UserRegionJson[];
}
