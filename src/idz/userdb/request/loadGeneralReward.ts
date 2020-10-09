import { AimeId } from "../../../model";

export interface LoadGeneralRewardRequest {
  type: "load_general_reward_req";
  aimeId: AimeId;
}
