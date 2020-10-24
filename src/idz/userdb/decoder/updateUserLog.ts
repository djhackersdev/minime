import { UpdateUserLogRequest } from "../request/updateUserLog";

updateUserLog1.msgCode = 0x00bd;
updateUserLog1.msgLen = 0x0050;

export function updateUserLog1(buf: Buffer): UpdateUserLogRequest {
  return { type: "update_user_log_req" };
}

updateUserLog2.msgCode = 0x00ab;
updateUserLog2.msgLen = 0x0050;

export function updateUserLog2(buf: Buffer): UpdateUserLogRequest {
  return { type: "update_user_log_req" };
}
