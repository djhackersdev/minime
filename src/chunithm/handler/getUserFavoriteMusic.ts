import { Repositories } from "../repo";
import { GetUserFavoriteMusicRequest } from "../request/getUserFavoriteMusic";
import { GetUserFavoriteMusicResponse } from "../response/getUserFavoriteMusic";
import { readAimeId } from "../proto/base";

export default async function getUserFavoriteMusic(
  rep: Repositories,
  req: GetUserFavoriteMusicRequest
): Promise<GetUserFavoriteMusicResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);

  /*
   * `Chunithm Amazon Plus` does not appear to save a favorites list and there
   * is no user-accessible favorites function from what I can tell.
   */
  return {
    userId: req.userId,
    length: "0",
    userFavoriteMusicList: [],
  };
}
