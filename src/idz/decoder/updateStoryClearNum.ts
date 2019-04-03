import { RequestCode } from "../defs";
import { UpdateStoryClearNumRequest } from "../request/updateStoryClearNum";

updateStoryClearNum.msgCode = 0x007f as RequestCode;
updateStoryClearNum.msgLen = 0x0010;

export function updateStoryClearNum(buf: Buffer): UpdateStoryClearNumRequest {
  return {
    type: "update_story_clear_num_req",
  };
}
