import { RequestCode } from "../defs";
import { LockGarageRequest } from "../request/lockGarage";

lockGarage.msgCode = 0x00a9 as RequestCode;
lockGarage.msgLen = 0x0010;

export function lockGarage(buf: Buffer): LockGarageRequest {
  return {
    type: "lock_garage_request",
    field_0004: buf.readUInt32LE(0x0004),
  };
}
