import { SaveExpeditionResponse } from "../response/saveExpedition";

export function saveExpedition1(res: SaveExpeditionResponse): Buffer {
  // in awe of the size of this lad
  const buf = Buffer.alloc(0x17c0);

  buf.writeInt16LE(0x008d, 0x0000);

  return buf;
}

export function saveExpedition2(res: SaveExpeditionResponse): Buffer {
  // absolute unit
  const buf = Buffer.alloc(0x18ac);

  buf.writeUInt16LE(0x0140, 0x0000);

  return buf;
}
