export { Page } from "./_defs";

import { UserActivityRepository } from "./userActivity";
import { UserCharacterRepository } from "./userCharacter";
import { UserCourseRepository } from "./userCourse";
import { UserDataRepository } from "./userData";
import { UserDataExRepository } from "./userDataEx";
import { UserDuelListRepository } from "./userDuelList";
import { UserGameOptionRepository } from "./userGameOption";
import { UserGameOptionExRepository } from "./userGameOptionEx";
import { UserItemRepository } from "./userItem";
import { UserMapRepository } from "./userMap";
import { UserMusicRepository } from "./userMusic";
import { UserPlaylogRepository } from "./userPlaylog";
import { UserChargeRepository } from "./userCharge";
import { UserRecentRatingRepository } from "./userRecentRating";

export interface Repositories {
  userActivity(): UserActivityRepository;

  userCharacter(): UserCharacterRepository;

  userCourse(): UserCourseRepository;

  userData(): UserDataRepository;

  userDataEx(): UserDataExRepository;

  userDuelList(): UserDuelListRepository;

  userGameOption(): UserGameOptionRepository;

  userGameOptionEx(): UserGameOptionExRepository;

  userItem(): UserItemRepository;

  userMap(): UserMapRepository;

  userMusic(): UserMusicRepository;

  userPlaylog(): UserPlaylogRepository;

  userCharge(): UserChargeRepository;

  userCourse(): UserCourseRepository;

  userRecentRating(): UserRecentRatingRepository;
}
