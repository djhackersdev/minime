import { AccountUnlockResponse } from "../response/accountUnlock";

export function accountUnlock(res: AccountUnlockResponse) {
  const buf = Buffer.alloc(0x0010);

  buf.writeInt16LE(0x0070, 0x0000);
  buf.writeInt8(res.status, 0x0004);

  return buf;
}
