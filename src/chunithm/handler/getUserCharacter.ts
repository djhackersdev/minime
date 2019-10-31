import { paginationCookie } from "./_util";
import { readAimeId } from "../proto/base";
import { writeUserCharacter } from "../proto/userCharacter";
import { Repositories } from "../repo";
import { GetUserCharacterRequest } from "../request/getUserCharacter";
import { GetUserCharacterResponse } from "../response/getUserCharacter";

export default async function getUserCharacter(
  rep: Repositories,
  req: GetUserCharacterRequest
): Promise<GetUserCharacterResponse> {
  const aimeId = readAimeId(req.userId);
  const maxCount = parseInt(req.maxCount);
  const nextIndex = parseInt(req.nextIndex);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep
    .userCharacter()
    .load(profileId, { limit: maxCount, offset: nextIndex });

  return {
    userId: req.userId,
    length: items.length.toString(),
    nextIndex: paginationCookie(items, { maxCount, nextIndex }),
    userCharacterList: items.map(writeUserCharacter),
  };
}
