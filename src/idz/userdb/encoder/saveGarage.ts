import { SaveGarageResponse } from "../response/saveGarage";

export function saveGarage(res: SaveGarageResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x008f, 0x0000);
  buf.writeUInt16LE(res.status, 0x0002);

  return buf;
}
