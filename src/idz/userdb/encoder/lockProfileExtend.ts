import { LockProfileExtendResponse } from "../response/lockProfileExtend";

export function lockProfileExtend1(res: LockProfileExtendResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x006e, 0x0000);
  buf.writeUInt8(res.status, 0x0004);

  return buf;
}

export function lockProfileExtend2(res: LockProfileExtendResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x006a, 0x0000);
  buf.writeUInt8(res.status, 0x0004);

  return buf;
}
