import { AccountLockResponse } from "../response/accountLock";

export function accountLock(res: AccountLockResponse) {
  const buf = Buffer.alloc(0x0020);

  buf.writeInt16LE(0x006a, 0x0000);
  buf.writeInt8(res.field_0018, 0x0018);
  buf.writeInt16LE(res.field_001A, 0x001a);
  buf.writeInt32LE(res.field_001C.getTime() / 1000, 0x001c);

  return buf;
}
