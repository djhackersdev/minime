import {
  SaveExpeditionResponse,
  SaveExpeditionResponse1,
  SaveExpeditionResponse2,
} from "../response/saveExpedition";

export function saveExpedition(res: SaveExpeditionResponse): Buffer {
  switch (res.format) {
    case 1:
      return saveExpedition1(res);

    case 2:
      return saveExpedition2(res);

    default:
      const exhaust: never = res;

      throw new Error(`Unsupported data format ${res["format"]}`);
  }
}

function saveExpedition1(res: SaveExpeditionResponse1): Buffer {
  // in awe of the size of this lad
  const buf = Buffer.alloc(0x17c0);

  buf.writeInt16LE(0x008d, 0x0000);

  return buf;
}

function saveExpedition2(res: SaveExpeditionResponse2): Buffer {
  // absolute unit
  const buf = Buffer.alloc(0x18ac);

  buf.writeUInt16LE(0x0140, 0x0000);

  return buf;
}
