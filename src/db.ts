import { randomBytes } from "crypto";
import { Pool, PoolClient } from "pg";

export type Id<T> = bigint & { __id: T };

const pool = new Pool();

export function connect(): Promise<PoolClient> {
  return pool.connect();
}

export function generateId(): bigint {
  const buf = randomBytes(8);

  buf[0] &= 0x7f; // Force number to be non-negative

  // Let's not depend on Node v12 for the sake of 3 LoC just yet.

  const hi = buf.readUInt32BE(0);
  const lo = buf.readUInt32BE(4);

  return (BigInt(hi) << 32n) | BigInt(lo);
}

/** Generate a random 32-bit ID for use in external protocol messages */
export function generateExtId(): number {
  const buf = randomBytes(4);

  buf[0] &= 0x7f; // Force number to be non-negative

  return buf.readUInt32BE(0);
}
