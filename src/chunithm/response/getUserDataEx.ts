import { UserDataExJson } from "../proto/userDataEx";

export interface GetUserDataExResponse {
  /** Integer, AiMe ID */
  userId: string;

  userDataEx: UserDataExJson;
}
