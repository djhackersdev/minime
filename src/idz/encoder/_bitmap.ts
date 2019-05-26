export function encodeBitmap(items: Set<number>, nbytes: number): Buffer {
  const buf = Buffer.alloc(nbytes);

  for (const item of items) {
    const byte = (item / 8) | 0;
    const bit = item % 8;

    buf.writeUInt8(buf.readUInt8(byte) | (1 << bit), byte);
  }

  return buf;
}
