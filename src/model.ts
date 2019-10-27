import { randomBytes } from "crypto";

/**
 * An internal database id.
 *
 * We don't have any say over the protocols that we are implementing, and we
 * would also like our internal data store to adhere to a consistent set of
 * design principles. This type defines a fully opaque primary key data type
 * for database records which should not be exposed to external clients under
 * normal circumstances. Clients outside the SQL DB (or other persistent data
 * storage) driver should make no assumptions about its structure or actual
 * underlying data type.
 *
 * Database entities presented to external clients must be identified using
 * alternative external identifiers in formats that are acceptable to those
 * external systems.
 */
export type Id<T> = string & { __type: T };

export type AimeId = number & { __aimeId: null };

/** Generate a random 32-bit ID for use in external protocol messages */
export function generateExtId(): number {
  const buf = randomBytes(4);

  buf[0] &= 0x7f; // Force number to be non-negative

  return buf.readUInt32BE(0);
}
