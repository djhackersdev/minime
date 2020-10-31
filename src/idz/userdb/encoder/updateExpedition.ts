import { UpdateExpeditionResponse } from "../response/updateExpedition";

export function updateExpedition(res: UpdateExpeditionResponse) {
  let buf: Buffer;

  if (res.expeditionType == 0) {
    buf = Buffer.alloc(0x0040);
    buf.writeInt16LE(1, 0x0000);
  } else {
    buf = Buffer.alloc(0x19f0);
    buf.writeInt16LE(0x0140, 0x0000);
    // Experiments used to live here, removed because they're a not-really
    // working mess. Hopefully, one day there will be beautiful code
    // here, that works and makes people happy. One day.
  }

  return buf;
}
