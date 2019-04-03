import { RequestCode } from "../defs";
import { LoadRewardTableRequest } from "../request/loadRewardTable";

loadRewardTable.msgCode = 0x0086 as RequestCode;
loadRewardTable.msgLen = 0x0010;

export function loadRewardTable(): LoadRewardTableRequest {
  return {
    type: "load_reward_table_req",
  };
}
