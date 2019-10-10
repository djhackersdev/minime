import { randomBytes } from "crypto";

export type AimeId = number & { __aimeId: null };

/** Generate a random 32-bit ID for use in external protocol messages */
export function generateExtId(): number {
  const buf = randomBytes(4);

  buf[0] &= 0x7f; // Force number to be non-negative

  return buf.readUInt32BE(0);
}
