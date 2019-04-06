import { BackgroundCode, Id } from "../model/base";
import { Chara } from "../model/chara";
import { Profile } from "../model/profile";

export interface SaveStockerRequest {
  type: "save_stocker_req";
  profileId: Id<Profile>;
  backgrounds: BackgroundCode[];
  chara: Chara;
}
