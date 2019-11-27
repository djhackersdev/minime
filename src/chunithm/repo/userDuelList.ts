import { Page } from "./_defs";
import { UserDataItem } from "../model/userData";
import { UserDuelListItem } from "../model/userDuelList";
import { Id } from "../../model";

export interface UserDuelListRepository {
  load(
    profileId: Id<UserDataItem>,
    duelId?: number,
  ): Promise<UserDuelListItem[]>;

  save(profileId: Id<UserDataItem>, obj: UserDuelListItem): Promise<void>;
}
