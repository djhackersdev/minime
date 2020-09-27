import * as sql from "sql-bricks-postgres";

import { Id } from "../model";

export interface Row {
  [key: string]: string | null;
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
  /**
   * Execute an async callback in the context of a database transaction.
   *
   * This method will open a database transaction and await the callback.
   * A transaction object will be passed to the callback, and this transaction
   * object can be used to perform queries against the database in the context
   * of the transaction. This database abstraction layer does not permit
   * queries to be executed outside of a transaction context.
   *
   * If the returned promise resolves then the transaction will be committed,
   * and if the promise rejects then the transaction will roll back. As you
   * would expect, really.
   *
   * Returns a promise equivalent to the promise returned by the callback.
   */
  transaction<T>(callback: (txn: Transaction) => Promise<T>): Promise<T>;

  /**
   * Execute an async callback in the context of a "maintenance" transaction.
   *
   * This method should be used when altering the data store's schema. On
   * SQLite it will temporarily disable foreign key constraints (and then
   * re-enable and validate them immediately prior to committing the
   * transaction) so that tables may be dropped and re-created.
   */
  maintenance<T>(callback: (txn: Transaction) => Promise<T>): Promise<T>;

  /**
   * Perform housekeeping operations on the database's on-disk data structures.
   *
   * This method is called after schema changes are performed, since these
   * are likely to completely rebuild one or more tables.
   */
  vacuum(): Promise<void>;
}
