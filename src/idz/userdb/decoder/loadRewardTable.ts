import { LoadRewardTableRequest } from "../request/loadRewardTable";

loadRewardTable1.msgCode = 0x0086;
loadRewardTable1.msgLen = 0x0010;

export function loadRewardTable1(): LoadRewardTableRequest {
  return {
    type: "load_reward_table_req",
  };
}

loadRewardTable2.msgCode = 0x007f;
loadRewardTable2.msgLen = 0x0010;

export function loadRewardTable2(): LoadRewardTableRequest {
  return {
    type: "load_reward_table_req",
  };
}
