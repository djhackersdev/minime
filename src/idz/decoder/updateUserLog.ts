import { RequestCode } from "./_defs";
import { UpdateUserLogRequest } from "../request/updateUserLog";

updateUserLog.msgCode = 0x00bd as RequestCode;
updateUserLog.msgLen = 0x0050;

export function updateUserLog(buf: Buffer): UpdateUserLogRequest {
  return { type: "update_user_log_req" };
}
