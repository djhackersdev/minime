import * as sql from "sql-bricks-postgres";

import { Id } from "../model";

export interface Row {
  [key: string]: string;
}

export interface Transaction {
  /**
   * Generate a new random primary key.
   *
   * On SQLite this is a random 63-bit integer (the high bit is always zero
   * so that all IDs are positive, mostly for aesthetic reasons although this
   * may also usefully reserve a namespace for automated testing).
   *
   * On Postgres this might generate UUIDv4s instead.
   */
  generateId<T>(): Id<T>;

  modify(stmt: sql.Statement): Promise<void>;

  fetchRow(stmt: sql.SelectStatement): Promise<Row | undefined>;

  fetchRows(stmt: sql.SelectStatement): Promise<Row[]>;

  raw(sql: string): Promise<void>;
}

export interface DataSource {
  transaction<T>(callback: (txn: Transaction) => Promise<T>): Promise<T>;

  vacuum(): Promise<void>;
}
