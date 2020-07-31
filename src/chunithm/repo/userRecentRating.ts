import { UserDataItem } from "../model/userData";
import { UserRecentRatingItem } from "../model/userRecentRating";
import { Id } from "../../model";

export interface UserRecentRatingRepository {
  load(profileId: Id<UserDataItem>): Promise<UserRecentRatingItem[]>;

  save(
    profileId: Id<UserDataItem>,
    objs: UserRecentRatingItem[]
  ): Promise<void>;
}
