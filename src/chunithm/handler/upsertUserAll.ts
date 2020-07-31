import { Repositories } from "../repo";
import { readAimeId } from "../proto/base";
import { readUserCharacter } from "../proto/userCharacter";
import { readUserData } from "../proto/userData";
import { readUserGameOption } from "../proto/userGameOption";
import { UpsertUserAllRequest } from "../request/upsertUserAll";
import { UpsertUserAllResponse } from "../response/upsertUserAll";
import { readUserGameOptionEx } from "../proto/userGameOptionEx";
import { readUserMap } from "../proto/userMap";
import { readUserItem } from "../proto/userItem";
import { readUserMusicDetail } from "../proto/userMusic";
import { readUserActivity } from "../proto/userActivity";
import { readUserDataEx } from "../proto/userDataEx";
import { readUserDuelList } from "../proto/userDuelList";
import { readUserPlaylog } from "../proto/userPlaylog";
import { readUserCharge } from "../proto/userCharge";
import { readUserRecentRating } from "../proto/userRecentRating";
import { readUserCourse } from "../proto/userCourse";

// It shouldn't need to be said really, but seeing as this message (A) requires
// fairly lengthy processing and (B) is only sent right at the end of a credit,
// you should probably copy the JSON from the server's debug log and then
// validate this implementation using curl if you're planning to make any
// modifications to how things get saved.

export default async function upsertUserAll(
  rep: Repositories,
  req: UpsertUserAllRequest
): Promise<UpsertUserAllResponse> {
  const aimeId = readAimeId(req.userId);
  const payload = req.upsertUserAll;
  const profile = readUserData(req.upsertUserAll.userData[0]);

  const profileId = await rep.userData().save(aimeId, profile);

  // Empty lists don't get sent at all. Not sure which are potentially empty
  // so let's just assume the answer is "all of them". Hence the use of || []
  // everywhere.

  for (const item of payload.userGameOption || []) {
    await rep.userGameOption().save(profileId, readUserGameOption(item));
  }

  for (const item of payload.userGameOptionEx || []) {
    await rep.userGameOptionEx().save(profileId, readUserGameOptionEx(item));
  }

  for (const item of payload.userMapList || []) {
    await rep.userMap().save(profileId, readUserMap(item));
  }

  for (const item of payload.userCharacterList || []) {
    await rep.userCharacter().save(profileId, readUserCharacter(item));
  }

  for (const item of payload.userItemList || []) {
    await rep.userItem().save(profileId, readUserItem(item));
  }

  for (const item of payload.userMusicDetailList || []) {
    await rep.userMusic().save(profileId, readUserMusicDetail(item));
  }

  for (const item of payload.userActivityList || []) {
    await rep.userActivity().save(profileId, readUserActivity(item));
  }

  for (const item of payload.userPlaylogList || []) {
    await rep.userPlaylog().save(profileId, readUserPlaylog(item));
  }

  for (const item of payload.userChargeList || []) {
    await rep.userCharge().save(profileId, readUserCharge(item));
  }

  for (const item of payload.userCourseList || []) {
    await rep.userCourse().save(profileId, readUserCourse(item));
  }

  for (const item of payload.userDataEx || []) {
    await rep.userDataEx().save(profileId, readUserDataEx(item));
  }

  for (const item of payload.userDuelList || []) {
    await rep.userDuelList().save(profileId, readUserDuelList(item));
  }

  await rep
    .userRecentRating()
    .save(
      profileId,
      (payload.userRecentRatingList || []).map(readUserRecentRating)
    );

  return { returnCode: "1" };
}
