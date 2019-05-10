import {
  UpdateStoryClearNumResponse,
  UpdateStoryClearNumResponse1,
  UpdateStoryClearNumResponse2,
} from "../response/updateStoryClearNum";

export function updateStoryClearNum(res: UpdateStoryClearNumResponse): Buffer {
  switch (res.format) {
    case 1:
      return updateStoryClearNum1(res);

    case 2:
      return updateStoryClearNum2(res);

    default:
      const exhaust: never = res;

      throw new Error(`Unsupported data format ${res["format"]}`);
  }
}

function updateStoryClearNum1(res: UpdateStoryClearNumResponse1): Buffer {
  const buf = Buffer.alloc(0x0220);

  buf.writeInt16LE(0x0080, 0x0000);

  return buf;
}

function updateStoryClearNum2(res: UpdateStoryClearNumResponse2): Buffer {
  const buf = Buffer.alloc(0x04f0);

  buf.writeInt16LE(0x013e, 0x0000);

  return buf;
}
