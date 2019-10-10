import { randomBytes } from "crypto";

export function generateId(): bigint {
  const buf = randomBytes(8);

  buf[0] &= 0x7f; // Force number to be non-negative

  // Let's not depend on Node v12 for the sake of 3 LoC just yet.

  const hi = buf.readUInt32BE(0);
  const lo = buf.readUInt32BE(4);

  return (BigInt(hi) << 32n) | BigInt(lo);
}
