import { Page } from "./_defs";
import { UserDataItem } from "../model/userData";
import { UserItemItem } from "../model/userItem";
import { Id } from "../../model";

export interface UserItemRepository {
  load(
    profileId: Id<UserDataItem>,
    itemKind: number,
    page: Page
  ): Promise<UserItemItem[]>;

  save(profileId: Id<UserDataItem>, obj: UserItemItem): Promise<void>;
}
