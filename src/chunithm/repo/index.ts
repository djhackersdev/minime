import { UserCourseRepository } from "./userCourse";

export { Page } from "./_defs";

import { UserActivityRepository } from "./userActivity";
import { UserCharacterRepository } from "./userCharacter";
import { UserDataRepository } from "./userData";
import { UserDataExRepository } from "./userDataEx";
import { UserDuelListRepository } from "./userDuelList";
import { UserGameOptionRepository } from "./userGameOption";
import { UserGameOptionExRepository } from "./userGameOptionEx";
import { UserItemRepository } from "./userItem";
import { UserMapRepository } from "./userMap";
import { UserMusicRepository } from "./userMusic";
import { UserPlaylogRepository } from "./userPlaylog";

export interface Repositories {
  userActivity(): UserActivityRepository;

  userCharacter(): UserCharacterRepository;

  userData(): UserDataRepository;

  userDataEx(): UserDataExRepository;

  userDuelList(): UserDuelListRepository;

  userGameOption(): UserGameOptionRepository;

  userGameOptionEx(): UserGameOptionExRepository;

  userItem(): UserItemRepository;

  userMap(): UserMapRepository;

  userMusic(): UserMusicRepository;

  userPlaylog(): UserPlaylogRepository;

  userCourse(): UserCourseRepository;
}
