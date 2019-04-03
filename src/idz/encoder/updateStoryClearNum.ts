import { UpdateStoryClearNumResponse } from "../response/updateStoryClearNum";

export function updateStoryClearNum(res: UpdateStoryClearNumResponse) {
  const buf = Buffer.alloc(0x0220);

  buf.writeInt16LE(0x0080, 0x0000);

  return buf;
}
