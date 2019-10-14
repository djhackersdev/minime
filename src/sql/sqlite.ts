import Database from "better-sqlite3";
import * as sql from "sql-bricks-postgres";

import { DataSource, Row, Transaction } from "./api";

type MixedRow = {
  [key: string]: any;
};

// bless me father for i have sinned
const fuFixup = new RegExp(" FOR UPDATE$");

function _preprocess(stmt: sql.Statement) {
  const params = stmt.toParams({ placeholder: "?" });
  const values = new Array<string | null>();

  for (const value of params.values) {
    // Pass null through as-is
    // Pass dates as ISO strings in UTC
    // Pass everything else (numbers, booleans, BigInts) as their string rep.

    if (value === null) {
      values.push(null);
    } else if (value instanceof Date) {
      values.push(value.toISOString());
    } else {
      values.push(value.toString());
    }
  }

  // Use string manipulation to cut off any trailing " FOR UPDATE" clause
  // in a SELECT statement, since SQLite doesn't support it. I really hope
  // that performing string manipulation on SQL code like this doesn't come
  // back to bite me.

  return {
    text: params.text.replace(fuFixup, ""),
    values,
  };
}

function _postprocess(obj: MixedRow): Row {
  const result = {};

  for (const [k, v] of Object.entries(obj)) {
    result[k] = v.toString();
  }

  return result;
}

class SqliteTransaction implements Transaction {
  constructor(private readonly _db: Database.Database) {}

  modify(stmt: sql.Statement): Promise<void> {
    const params = _preprocess(stmt);

    this._db.prepare(params.text).run(...params.values);

    return Promise.resolve();
  }

  fetchRow(stmt: sql.SelectStatement): Promise<Row | undefined> {
    const params = _preprocess(stmt);
    const raw = this._db.prepare(params.text).get(...params.values);
    const result = raw && _postprocess(raw);

    return Promise.resolve(result);
  }

  fetchRows(stmt: sql.SelectStatement): Promise<Row[]> {
    const params = _preprocess(stmt);
    const raw = this._db.prepare(params.text).all(...params.values);
    const result = raw.map(_postprocess);

    return Promise.resolve(result);
  }
}

class SqliteDataSource implements DataSource {
  constructor(private readonly _path: string) {}

  async transaction<T>(
    callback: (txn: Transaction) => Promise<T>
  ): Promise<T> {
    const db = new Database(this._path);

    db.defaultSafeIntegers();
    db.prepare("begin").run();

    try {
      const txn = new SqliteTransaction(db);
      const result = await callback(txn);

      db.prepare("commit").run();

      return result;
    } catch (e) {
      db.prepare("rollback").run();

      return Promise.reject(e);
    }
  }
}

export function openSqlite(path: string): DataSource {
  return new SqliteDataSource(path);
}
