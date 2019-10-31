import { UserGameOptionExJson } from "../proto/userGameOptionEx";

export interface GetUserOptionExResponse {
  /** Integer, AiMe ID */
  userId: string;

  userGameOptionEx: UserGameOptionExJson;
}
