import { UserCharacterJson } from "../proto/userCharacter";

export interface GetUserPreviewResponse {
  //
  // AiMe ID, from request
  //

  /** Integer */
  userId: string;

  //
  // Current login (i.e. profile lock) status
  //

  /** Boolean */
  isLogin: string;

  /** Date "YYYY-MM-DD hh:mm:ss" */
  lastLoginDate: string;

  //
  // UserData
  //

  /** String */
  userName: string;

  /** Integer */
  reincarnationNum: string;

  /** Integer */
  level: string;

  /** Integer */
  exp: string;

  /** Integer */
  playerRating: string;

  /** String */
  lastGameId: string;

  /** String */
  lastRomVersion: string;

  /** String */
  lastDataVersion: string;

  /** Date "YYYY-MM-DD hh:mm:ss" */
  lastPlayDate: string;

  /** Integer */
  trophyId: string;

  //
  // Currently selected UserCharacter
  //

  userCharacter: UserCharacterJson;

  //
  // UserGameOption
  //

  playerLevel: string;
  rating: string;
  headphone: string;
}
