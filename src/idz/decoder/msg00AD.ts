import { RequestCode } from "./_defs";
import { Message00AD } from "../request/msg00AD";

msg00AD.msgCode = 0x00ad as RequestCode;
msg00AD.msgLen = 0x061c;

export function msg00AD(buf: Buffer): Message00AD {
  return { type: "msg_00AD_req" };
}
