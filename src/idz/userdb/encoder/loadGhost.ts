import { LoadGhostResponse } from "../response/loadGhost";

function _loadGhost(msgCode: number, res: LoadGhostResponse): Buffer {
  const buf = Buffer.alloc(0x0070);

  // No idea what any of this even does.

  buf.writeUInt16LE(msgCode, 0x0000);
  buf.writeUInt16LE(0x0005, 0x0002); // Chunk presence flags: 4 | 1

  for (let i = 0; i < 2; i++) {
    const base = 0x04 + i * 0x34;

    buf.writeUInt32LE(0, base + 0x00);
    buf.writeUInt32LE(0xffffffff, base + 0x04);

    for (let j = 0; j < 3; j++) {
      buf.writeUInt32LE(120000, base + 0x08 + j * 0x04);
    }

    buf.writeUInt32LE(0, base + 0x14);
    buf.writeUInt16LE(0xffff, base + 0x18);
    buf.writeUInt8(0, base + 0x1a);
    buf.writeUInt8(0, base + 0x1b);
    buf.writeUInt8(0, base + 0x1c);
    buf.writeUInt8(0, base + 0x1d);
    buf.write("\0", base + 0x20);
  }

  return buf;
}

export function loadGhost1(res: LoadGhostResponse): Buffer {
  return _loadGhost(0x00a1, res);
}

export function loadGhost2(res: LoadGhostResponse): Buffer {
  return _loadGhost(0x0096, res);
}
