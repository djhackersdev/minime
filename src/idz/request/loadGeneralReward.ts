import { AimeId } from "../../model";

interface LoadGeneralRewardRequestBase {
  type: "load_general_reward_req";
  aimeId: AimeId;
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
