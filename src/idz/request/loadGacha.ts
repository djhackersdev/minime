import { ExtId } from "../model/base";
import { Profile } from "../model/profile";

export interface LoadGachaRequest {
  type: "load_gacha_req";
  profileId: ExtId<Profile>;
}
