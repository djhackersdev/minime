import { UserGameOptionJson } from "../proto/userGameOption";

export interface GetUserOptionResponse {
  /** Integer, AiMe ID */
  userId: string;

  userGameOption: UserGameOptionJson;
}
