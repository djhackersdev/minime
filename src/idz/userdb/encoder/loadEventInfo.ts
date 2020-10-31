import { LoadEventInfoResponse } from "../response/loadEventInfo";

export function loadEventInfo1(res: LoadEventInfoResponse): Buffer {
  const buf = Buffer.alloc(0x01b0);

  buf.writeUInt16LE(0x00bf, 0x0000);

  return buf;
}

export function loadEventInfo2(res: LoadEventInfoResponse): Buffer {
  const buf = Buffer.alloc(0x01b0);

  buf.writeUInt16LE(0x00ad, 0x0000);

  return buf;
}
