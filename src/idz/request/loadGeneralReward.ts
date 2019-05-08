import { ExtId } from "../model/base";
import { Profile } from "../model/profile";

interface LoadGeneralRewardRequestBase {
  type: "load_general_reward_req";
  profileId: ExtId<Profile>;
}

export interface LoadGeneralRewardRequest1
  extends LoadGeneralRewardRequestBase {
  format: 1;
}

export interface LoadGeneralRewardRequest2
  extends LoadGeneralRewardRequestBase {
  format: 2;
}

export type LoadGeneralRewardRequest =
  | LoadGeneralRewardRequest1
  | LoadGeneralRewardRequest2;
