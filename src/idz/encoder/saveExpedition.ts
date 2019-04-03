import { SaveExpeditionResponse } from "../response/saveExpedition";

export function saveExpedition(res: SaveExpeditionResponse) {
  // in awe of the size of this lad
  const buf = Buffer.alloc(0x17c0);

  buf.writeInt16LE(0x008d, 0x0000);

  return buf;
}
