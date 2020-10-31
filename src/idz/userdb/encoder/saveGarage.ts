import { SaveGarageResponse } from "../response/saveGarage";

export function saveGarage1(res: SaveGarageResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x008f, 0x0000);
  buf.writeUInt16LE(res.status, 0x0002);

  return buf;
}

export function saveGarage2(res: SaveGarageResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x0086, 0x0000);
  buf.writeUInt16LE(res.status, 0x0004);

  return buf;
}
