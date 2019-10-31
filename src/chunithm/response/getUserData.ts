import { UserDataJson } from "../proto/userData";

export interface GetUserDataResponse {
  /** Integer, AiMe ID */
  userId: string;

  userData: UserDataJson;
}
