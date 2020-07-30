import { UserDataJson } from "../proto/userData";
import { UserGameOptionJson } from "../proto/userGameOption";
import { UserGameOptionExJson } from "../proto/userGameOptionEx";
import { UserMapJson } from "../proto/userMap";
import { UserCharacterJson } from "../proto/userCharacter";
import { UserItemJson } from "../proto/userItem";
import { UserMusicDetailJson } from "../proto/userMusic";
import { UserActivityJson } from "../proto/userActivity";
import { UserRecentRatingJson } from "../proto/userRecentRating";
import { UserPlaylogJson } from "../proto/userPlaylog";
import { UserChargeJson } from "../proto/userCharge";
import { UserCourseJson } from "../proto/userCourse";
import { UserDataExJson } from "../proto/userDataEx";
import { UserDuelListJson } from "../proto/userDuelList";

export interface UpsertUserAllRequest {
  /** Integer, AiMe ID */
  userId: string;

  upsertUserAll: {
    userData: UserDataJson[];
    userGameOption?: UserGameOptionJson[];
    userGameOptionEx?: UserGameOptionExJson[];
    userMapList?: UserMapJson[];
    userCharacterList?: UserCharacterJson[];
    userItemList?: UserItemJson[];
    userMusicDetailList?: UserMusicDetailJson[];
    userActivityList?: UserActivityJson[];
    userRecentRatingList?: UserRecentRatingJson[];
    userPlaylogList?: UserPlaylogJson[];
    userChargeList?: UserChargeJson[];
    userCourseList?: UserCourseJson[];
    userDataEx?: UserDataExJson[];
    userDuelList?: UserDuelListJson[];

    /** String of binary digits */
    isNewMapList: string;

    /** String of binary digits */
    isNewCharacterList: string;

    /** String of binary digits */
    isNewMusicDetailList: string;

    /** String of binary digits */
    isNewItemList: string;

    /** String of binary digits */
    isNewCourseList: string;

    /** String of binary digits */
    isNewDuelList: string;
  };
}
