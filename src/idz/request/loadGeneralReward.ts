import { ExtId } from "../model/base";
import { Profile } from "../model/profile";

export interface LoadGeneralRewardRequest {
  type: "load_general_reward_req";
  profileId: ExtId<Profile>;
}
