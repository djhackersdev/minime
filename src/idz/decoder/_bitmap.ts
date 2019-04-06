export function bitmap(buf: Buffer): number[] {
  const result = new Array();

  for (let byteNo = 0; byteNo < buf.length; byteNo++) {
    const byte = buf.readUInt8(byteNo);

    for (let bitNo = 0; bitNo < 8; bitNo++) {
      if (byte & (1 << bitNo)) {
        result.push(8 * byteNo + bitNo);
      }
    }
  }

  return result;
}
