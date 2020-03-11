export function readBigInt(buf: Buffer) {
  let result = 0n;

  for (let i = 0; i < buf.length; i++) {
    const shift = 8n * BigInt(i);
    const byte = buf.readUInt8(i);

    result |= BigInt(byte) << shift;
  }

  return result;
}

export function writeBigInt(n: bigint, length: number) {
  const result = Buffer.alloc(length);

  for (let i = 0; i < length; i++) {
    const shift = 8n * BigInt(i);
    const byte = (n >> shift) & 0xffn;

    result[i] = Number(byte);
  }

  return result;
}

// i pick the one implementation language that doesn't have this built in

export function modPow(b: bigint, e: bigint, m: bigint) {
  // https://en.wikipedia.org/wiki/Modular_exponentiation#Right-to-left_binary_method

  let result = 1n;

  b = b % m;

  while (e > 0n) {
    if ((e & 1n) === 1n) {
      result = (result * b) % m;
    }

    e = e >> 1n;
    b = (b * b) % m;
  }

  return result;
}
