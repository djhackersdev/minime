import { SingletonJsonRepo } from "./_singleton";
import { ProfileRepository } from "./base";
import { AimeId } from "../model/base";
import { Profile } from "../model/profile";

export class ProfileRepositoryImpl extends SingletonJsonRepo<Profile>
  implements ProfileRepository {
  constructor(root) {
    super(root, "profile");
  }

  discoverByAimeId(id: AimeId): Promise<boolean> {
    return this._discoverSingleton();
  }

  loadByAimeId(id: AimeId): Promise<Profile> {
    return this._loadSingleton();
  }
}
