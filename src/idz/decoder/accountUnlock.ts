import { RequestCode } from "../defs";
import { AccountUnlockRequest } from "../request/accountUnlock";

accountUnlock.msgCode = 0x006f as RequestCode;
accountUnlock.msgLen = 0x0020;

export function accountUnlock(buf: Buffer): AccountUnlockRequest {
  return {
    type: "account_unlock_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
  };
}
