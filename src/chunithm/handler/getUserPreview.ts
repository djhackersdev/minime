import { readAimeId, writeDate } from "../proto/base";
import { writeUserCharacter } from "../proto/userCharacter";
import { Repositories } from "../repo";
import { GetUserPreviewRequest } from "../request/getUserPreview";
import { GetUserPreviewResponse } from "../response/getUserPreview";

export default async function getUserPreview(
  rep: Repositories,
  req: GetUserPreviewRequest
): Promise<GetUserPreviewResponse | null> {
  const aimeId = readAimeId(req.userId);
  const profileId = await rep.userData().tryLookup(aimeId);

  // Return an empty JSON object if the player lacks a profile; this will
  // start the new profile registration flow in the client.

  if (profileId === undefined) {
    return null;
  }

  const userData = await rep.userData().load(profileId);
  const userCharacter = await rep
    .userCharacter()
    .loadOne(profileId, userData.characterId);
  const userGameOption = await rep.userGameOption().load(profileId);

  return {
    userId: "1",

    // Current login (i.e. profile lock) status

    isLogin: "false",
    lastLoginDate: "1970-01-01 09:00:00",

    // UserData:

    userName: userData.userName,
    reincarnationNum: userData.reincarnationNum.toString(),
    level: userData.level.toString(),
    exp: userData.exp.toString(),
    playerRating: userData.playerRating.toString(),
    lastGameId: userData.lastGameId,
    lastRomVersion: userData.lastRomVersion,
    lastDataVersion: userData.lastDataVersion,
    lastPlayDate: writeDate(userData.lastPlayDate),
    trophyId: userData.trophyId.toString(),

    // Currently selected UserCharacter:

    userCharacter: writeUserCharacter(userCharacter),

    // UserGameOption:

    playerLevel: userGameOption.playerLevel.toString(),
    rating: userGameOption.rating.toString(),
    headphone: userGameOption.headphone.toString(),
  };
}
