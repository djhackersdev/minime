export function bitmap<T extends number>(buf: Buffer): Set<T> {
  const result = new Set<T>();

  for (let byteNo = 0; byteNo < buf.length; byteNo++) {
    const byte = buf.readUInt8(byteNo);

    for (let bitNo = 0; bitNo < 8; bitNo++) {
      if (byte & (1 << bitNo)) {
        result.add((8 * byteNo + bitNo) as T);
      }
    }
  }

  return result;
}
