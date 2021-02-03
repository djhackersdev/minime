import { UpdateStoryClearNumResponse } from "../response/updateStoryClearNum";

export function updateStoryClearNum1(
  res: UpdateStoryClearNumResponse
): Buffer {
  const buf = Buffer.alloc(0x0220);

  buf.writeInt16LE(0x0080, 0x0000);

  return buf;
}

export function updateStoryClearNum2(
  res: UpdateStoryClearNumResponse
): Buffer {
  const buf = Buffer.alloc(0x04f0);

  buf.writeInt16LE(0x013e, 0x0000);

  return buf;
}

export function updateStoryClearNum3(
  res: UpdateStoryClearNumResponse
): Buffer {
  const buf = Buffer.alloc(0x0510);

  buf.writeInt16LE(0x013e, 0x0000);

  return buf;
}
