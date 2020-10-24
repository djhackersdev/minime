import { LockGarageRequest } from "../request/lockGarage";

lockGarage1.msgCode = 0x00a9;
lockGarage1.msgLen = 0x0010;

export function lockGarage1(buf: Buffer): LockGarageRequest {
  return {
    type: "lock_garage_request",
    field_0004: buf.readUInt32LE(0x0004),
  };
}

lockGarage2.msgCode = 0x009e;
lockGarage2.msgLen = 0x0010;

export function lockGarage2(buf: Buffer): LockGarageRequest {
  return {
    type: "lock_garage_request",
    field_0004: buf.readUInt32LE(0x0004),
  };
}
