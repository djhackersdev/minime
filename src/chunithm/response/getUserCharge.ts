import { UserChargeJson } from "../proto/userCharge";

export interface GetUserChargeResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  userChargeList: UserChargeJson[];
}
