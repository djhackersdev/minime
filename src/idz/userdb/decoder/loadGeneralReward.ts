import { LoadGeneralRewardRequest } from "../request/loadGeneralReward";
import { AimeId } from "../../../model";

loadGeneralReward1.msgCode = 0x009c;
loadGeneralReward1.msgLen = 0x0010;

export function loadGeneralReward1(buf: Buffer): LoadGeneralRewardRequest {
  return {
    type: "load_general_reward_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}

loadGeneralReward2.msgCode = 0x093b;
loadGeneralReward2.msgLen = 0x0010;

export function loadGeneralReward2(buf: Buffer): LoadGeneralRewardRequest {
  return {
    type: "load_general_reward_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}

loadGeneralReward3.msgCode = 0x013b;
loadGeneralReward3.msgLen = 0x0010;

export function loadGeneralReward3(buf: Buffer): LoadGeneralRewardRequest {
  return {
    type: "load_general_reward_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}
