import { SqlUserActivityRepository } from "./userActivity";
import { SqlUserCharacterRepository } from "./userCharacter";
import { SqlUserChargeRepository } from "./userCharge";
import { SqlUserCourseRepository } from "./userCourse";
import { SqlUserDataRepository } from "./userData";
import { SqlUserDataExRepository } from "./userDataEx";
import { SqlUserDuelListRepository } from "./userDuelList";
import { SqlUserGameOptionRepository } from "./userGameOption";
import { SqlUserGameOptionExRepository } from "./userGameOptionEx";
import { SqlUserItemRepository } from "./userItem";
import { SqlUserMapRepository } from "./userMap";
import { SqlUserMusicRepository } from "./userMusic";
import { SqlUserPlaylogRepository } from "./userPlaylog";
import { SqlUserRecentRatingRepository } from "./userRecentRating";
import { Repositories } from "../repo";
import { UserActivityRepository } from "../repo/userActivity";
import { UserCharacterRepository } from "../repo/userCharacter";
import { UserChargeRepository } from "../repo/userCharge";
import { UserCourseRepository } from "../repo/userCourse";
import { UserDataRepository } from "../repo/userData";
import { UserDataExRepository } from "../repo/userDataEx";
import { UserDuelListRepository } from "../repo/userDuelList";
import { UserGameOptionRepository } from "../repo/userGameOption";
import { UserGameOptionExRepository } from "../repo/userGameOptionEx";
import { UserItemRepository } from "../repo/userItem";
import { UserMapRepository } from "../repo/userMap";
import { UserMusicRepository } from "../repo/userMusic";
import { UserPlaylogRepository } from "../repo/userPlaylog";
import { UserRecentRatingRepository } from "../repo/userRecentRating";
import { Transaction } from "../../sql";

export class SqlRepositories implements Repositories {
  constructor(private readonly _txn: Transaction) {}

  userActivity(): UserActivityRepository {
    return new SqlUserActivityRepository(this._txn);
  }

  userCharacter(): UserCharacterRepository {
    return new SqlUserCharacterRepository(this._txn);
  }

  userCharge(): UserChargeRepository {
    return new SqlUserChargeRepository(this._txn);
  }

  userCourse(): UserCourseRepository {
    return new SqlUserCourseRepository(this._txn);
  }

  userData(): UserDataRepository {
    return new SqlUserDataRepository(this._txn);
  }

  userDataEx(): UserDataExRepository {
    return new SqlUserDataExRepository(this._txn);
  }

  userDuelList(): UserDuelListRepository {
    return new SqlUserDuelListRepository(this._txn);
  }

  userGameOption(): UserGameOptionRepository {
    return new SqlUserGameOptionRepository(this._txn);
  }

  userGameOptionEx(): UserGameOptionExRepository {
    return new SqlUserGameOptionExRepository(this._txn);
  }

  userItem(): UserItemRepository {
    return new SqlUserItemRepository(this._txn);
  }

  userMap(): UserMapRepository {
    return new SqlUserMapRepository(this._txn);
  }

  userMusic(): UserMusicRepository {
    return new SqlUserMusicRepository(this._txn);
  }

  userPlaylog(): UserPlaylogRepository {
    return new SqlUserPlaylogRepository(this._txn);
  }

  userRecentRating(): UserRecentRatingRepository {
    return new SqlUserRecentRatingRepository(this._txn);
  }
}
