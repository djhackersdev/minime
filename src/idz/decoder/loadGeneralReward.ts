import { RequestCode } from "./_defs";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import {
  LoadGeneralRewardRequest1,
  LoadGeneralRewardRequest2,
} from "../request/loadGeneralReward";

loadGeneralReward1.msgCode = 0x009c as RequestCode;
loadGeneralReward1.msgLen = 0x0010;

export function loadGeneralReward1(buf: Buffer): LoadGeneralRewardRequest1 {
  return {
    type: "load_general_reward_req",
    format: 1,
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
  };
}

loadGeneralReward2.msgCode = 0x013b as RequestCode;
loadGeneralReward2.msgLen = 0x0010;

export function loadGeneralReward2(buf: Buffer): LoadGeneralRewardRequest2 {
  return {
    type: "load_general_reward_req",
    format: 2,
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
  };
}
