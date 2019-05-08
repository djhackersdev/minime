import { RequestCode } from "./_defs";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { LoadGeneralRewardRequest } from "../request/loadGeneralReward";

loadGeneralReward.msgCode = 0x009c as RequestCode;
loadGeneralReward.msgLen = 0x0010;

export function loadGeneralReward(buf: Buffer): LoadGeneralRewardRequest {
  return {
    type: "load_general_reward_req",
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
  };
}
