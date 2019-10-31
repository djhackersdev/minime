import { UserCharacterJson } from "../proto/userCharacter";

export interface GetUserCharacterResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  /**
   * Integer, pagination cookie. Sent back in next request if
   * `length === maxCount`.
   */
  nextIndex: string;

  userCharacterList: UserCharacterJson[];
}
