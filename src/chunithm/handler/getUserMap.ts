import { readAimeId } from "../proto/base";
import { writeUserMap } from "../proto/userMap";
import { Repositories } from "../repo";
import { GetUserMapRequest } from "../request/getUserMap";
import { GetUserMapResponse } from "../response/getUserMap";

export default async function getUserMap(
  rep: Repositories,
  req: GetUserMapRequest
): Promise<GetUserMapResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userMap().load(profileId);

  return {
    userId: req.userId,
    length: items.length.toString(),
    userMapList: items.map(writeUserMap),
  };
}
