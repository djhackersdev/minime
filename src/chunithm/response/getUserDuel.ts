import { UserDuelListJson } from "../proto/userDuelList";

export interface GetUserDuelResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  /**
   * List of duel entities, either all duel entities associated with `userId`
   * or single requested by `duelId` in request.
   */
  userDuelList: UserDuelListJson[];
}
