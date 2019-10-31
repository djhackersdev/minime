import { UserMusicJson } from "../proto/userMusic";

export interface GetUserMusicResponse {
  /** Integer, AiMe ID */
  userId: string;

  /**
   * Integer, number of top-level `UserMusicJson` objects returned (each of
   * which will, in turn, contain one or more "detail" objects).
   */
  length: string;

  /** Integer, pagination cookie */
  nextIndex: string;

  /**
   * List of `UserMusicDetailJson` objects grouped by `musicId` into
   * `UserMusicJson` objects.
   **/
  userMusicList: UserMusicJson[];
}
