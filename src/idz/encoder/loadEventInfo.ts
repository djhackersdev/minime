import { LoadEventInfoResponse } from "../response/loadEventInfo";

export function loadEventInfo(res: LoadEventInfoResponse): Buffer {
  const buf = Buffer.alloc(0x01b0);

  buf.writeUInt16LE(0x00bf, 0x0000);

  return buf;
}
