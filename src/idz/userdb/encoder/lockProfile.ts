import { LockProfileResponse } from "../response/lockProfile";

const statusCodes = {
  locked: 0x0000,
  unlocked: 0x0001,
  obsolete: 0x0002,
};

export function lockProfile1(res: LockProfileResponse) {
  const buf = Buffer.alloc(0x0020);

  buf.writeInt16LE(0x006a, 0x0000);
  buf.writeInt8(statusCodes[res.status], 0x0018);
  buf.writeInt16LE(res.field_001A, 0x001a);
  buf.writeInt32LE(res.lockExpiry.getTime() / 1000, 0x001c);

  return buf;
}

export function lockProfile2(res: LockProfileResponse) {
  const buf = Buffer.alloc(0x0020);

  buf.writeInt16LE(0x0066, 0x0000);
  buf.writeInt8(statusCodes[res.status], 0x0018);
  buf.writeInt16LE(res.field_001A, 0x001a);
  buf.writeInt32LE(res.lockExpiry.getTime() / 1000, 0x001c);

  return buf;
}
