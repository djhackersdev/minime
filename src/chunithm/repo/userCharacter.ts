import { RepositoryN } from "./_defs";
import { UserCharacterItem } from "../model/userCharacter";
import { UserDataItem } from "../model/userData";
import { Id } from "../../model";

export interface UserCharacterRepository
  extends RepositoryN<UserCharacterItem> {
  loadOne(
    profileId: Id<UserDataItem>,
    characterId: number
  ): Promise<UserCharacterItem>;
}
