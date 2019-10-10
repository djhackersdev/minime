import { Pool, PoolClient } from "pg";
import * as sql from "sql-bricks-postgres";

import { DataSource, Row, Transaction } from "./api";

class PgTransaction implements Transaction {
  constructor(private readonly _conn: PoolClient) {}

  async modify(stmt: sql.Statement): Promise<void> {
    await this._conn.query(stmt.toParams());
  }

  async fetchRow(stmt: sql.SelectStatement): Promise<Row | undefined> {
    const { rows } = await this._conn.query(stmt.toParams());

    return rows[0];
  }

  async fetchRows(stmt: sql.SelectStatement): Promise<Row[]> {
    const { rows } = await this._conn.query(stmt.toParams());

    return rows;
  }
}

class PgDataSource implements DataSource {
  private readonly _pool: Pool;

  constructor() {
    this._pool = new Pool();
  }

  async transaction<T>(
    callback: (txn: Transaction) => Promise<T>
  ): Promise<T> {
    const conn = await this._pool.connect();

    await conn.query("begin");

    try {
      const txn = new PgTransaction(conn);
      const result = await callback(txn);

      await conn.query("commit");

      return result;
    } catch (e) {
      await conn.query("rollback");

      return Promise.reject(e);
    }
  }
}

export function openDataSource(): DataSource {
  return new PgDataSource();
}
