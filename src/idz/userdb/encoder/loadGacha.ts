import { LoadGachaResponse } from "../response/loadGacha";

export function loadGacha1(res: LoadGachaResponse): Buffer {
  const buf = Buffer.alloc(0x0090);

  buf.writeUInt16LE(0x00c2, 0x0000);
  buf.writeUInt8(res.awardedToday ? 0x01 : 0x00, 0x0002);

  return buf;
}

export function loadGacha2(res: LoadGachaResponse): Buffer {
  const buf = Buffer.alloc(0x0090);

  buf.writeUInt16LE(0x00b0, 0x0000);
  buf.writeUInt8(res.awardedToday ? 0x01 : 0x00, 0x0004);

  return buf;
}
