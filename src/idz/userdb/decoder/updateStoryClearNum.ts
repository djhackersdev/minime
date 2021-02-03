import { UpdateStoryClearNumRequest } from "../request/updateStoryClearNum";

updateStoryClearNum1.msgCode = 0x007f;
updateStoryClearNum1.msgLen = 0x0010;

export function updateStoryClearNum1(buf: Buffer): UpdateStoryClearNumRequest {
  return {
    type: "update_story_clear_num_req",
  };
}

updateStoryClearNum2.msgCode = 0x097f;
updateStoryClearNum2.msgLen = 0x0010;

export function updateStoryClearNum2(buf: Buffer): UpdateStoryClearNumRequest {
  return {
    type: "update_story_clear_num_req",
  };
}

updateStoryClearNum3.msgCode = 0x013d;
updateStoryClearNum3.msgLen = 0x0010;

export function updateStoryClearNum3(buf: Buffer): UpdateStoryClearNumRequest {
  return {
    type: "update_story_clear_num_req",
  };
}
