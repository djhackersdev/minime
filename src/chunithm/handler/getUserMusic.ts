import { writeUserMusicDetail, UserMusicJson } from "../proto/userMusic";
import { Repositories } from "../repo";
import { GetUserMusicRequest } from "../request/getUserMusic";
import { GetUserMusicResponse } from "../response/getUserMusic";
import { readAimeId } from "../proto/base";
import { UserMusicDetailItem } from "../model/userMusic";
import { paginationCookie } from "./_util";

export default async function getUserMusic(
  rep: Repositories,
  req: GetUserMusicRequest
): Promise<GetUserMusicResponse> {
  const aimeId = readAimeId(req.userId);
  const maxCount = parseInt(req.maxCount);
  const nextIndex = parseInt(req.nextIndex);

  const profileId = await rep.userData().lookup(aimeId);
  const flat = await rep
    .userMusic()
    .load(profileId, { limit: maxCount, offset: nextIndex });

  const groupIdx = new Map<number, UserMusicDetailItem[]>();

  for (const item of flat) {
    const { musicId } = item;
    const existing = groupIdx.get(musicId);

    if (existing !== undefined) {
      existing.push(item);
    } else {
      groupIdx.set(musicId, [item]);
    }
  }

  const userMusicList = new Array<UserMusicJson>();

  for (const group of groupIdx.values()) {
    userMusicList.push({
      length: group.length.toString(),
      userMusicDetailList: group.map(writeUserMusicDetail),
    });
  }

  return {
    userId: req.userId,
    length: userMusicList.length.toString(),
    nextIndex: paginationCookie(flat, { maxCount, nextIndex }),
    userMusicList,
  };
}
