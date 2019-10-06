import {
  LoadGeneralRewardRequest1,
  LoadGeneralRewardRequest2,
} from "../request/loadGeneralReward";
import { AimeId } from "../../model";

loadGeneralReward1.msgCode = 0x009c;
loadGeneralReward1.msgLen = 0x0010;

export function loadGeneralReward1(buf: Buffer): LoadGeneralRewardRequest1 {
  return {
    type: "load_general_reward_req",
    format: 1,
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}

loadGeneralReward2.msgCode = 0x013b;
loadGeneralReward2.msgLen = 0x0010;

export function loadGeneralReward2(buf: Buffer): LoadGeneralRewardRequest2 {
  return {
    type: "load_general_reward_req",
    format: 2,
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}
