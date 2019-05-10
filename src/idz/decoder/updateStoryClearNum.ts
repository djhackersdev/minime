import { RequestCode } from "./_defs";
import {
  UpdateStoryClearNumRequest1,
  UpdateStoryClearNumRequest2,
} from "../request/updateStoryClearNum";

updateStoryClearNum1.msgCode = 0x007f as RequestCode;
updateStoryClearNum1.msgLen = 0x0010;

export function updateStoryClearNum1(
  buf: Buffer
): UpdateStoryClearNumRequest1 {
  return {
    type: "update_story_clear_num_req",
    format: 1,
  };
}

updateStoryClearNum2.msgCode = 0x013d as RequestCode;
updateStoryClearNum2.msgLen = 0x0010;

export function updateStoryClearNum2(
  buf: Buffer
): UpdateStoryClearNumRequest2 {
  return {
    type: "update_story_clear_num_req",
    format: 2,
  };
}
