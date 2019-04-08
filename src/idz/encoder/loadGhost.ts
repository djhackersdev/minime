import { LoadGhostResponse } from "../response/loadGhost";

export function loadGhost(res: LoadGhostResponse): Buffer {
  const buf = Buffer.alloc(0x0070);

  buf.writeUInt16LE(0x00a1, 0x0000);

  return buf;
}
