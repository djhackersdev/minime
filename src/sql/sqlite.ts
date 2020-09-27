import Database, { ResultRow } from "@decafcode/sqlite";
import { randomBytes } from "crypto";
import logger from "debug";
import * as sql from "sql-bricks-postgres";

import { DataSource, Row, Transaction } from "./api";
import { Id } from "../model";

const debug = logger("app:sqlite");

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

function _postprocess(obj: ResultRow): Row {
  const result = {};

  for (const [k, v] of Object.entries(obj)) {
    // Return NULL values as js null, everything else as a string.

    if (v === null) {
      result[k] = null;
    } else {
      result[k] = v.toString();
    }
  }

  return result;
}

export class MaintenanceError extends Error {
  constructor(msg: string, public readonly fkViolations: any[]) {
    super(msg);
  }
}

class SqliteTransaction implements Transaction {
  constructor(private readonly _db: Database) {}

  generateId<T>(): Id<T> {
    const buf = randomBytes(8);

    buf[0] &= 0x7f; // Force number to be non-negative

    const val = buf.readBigUInt64BE(0);
    const str = val.toString();

    return str as Id<T>;
  }

  modify(stmt: sql.Statement): Promise<void> {
    const params = _preprocess(stmt);
    const prepared = this._db.prepare(params.text);

    try {
      prepared.run(params.values);
    } finally {
      prepared.close();
    }

    return Promise.resolve();
  }

  fetchRow(stmt: sql.SelectStatement): Promise<Row | undefined> {
    const params = _preprocess(stmt);
    const prepared = this._db.prepare(params.text);

    try {
      const raw = prepared.one(params.values);
      const result = raw && _postprocess(raw);

      return Promise.resolve(result);
    } finally {
      prepared.close();
    }
  }

  fetchRows(stmt: sql.SelectStatement): Promise<Row[]> {
    const params = _preprocess(stmt);
    const prepared = this._db.prepare(params.text);

    try {
      const raw = prepared.all(params.values);
      const result = raw.map(_postprocess);

      return Promise.resolve(result);
    } finally {
      prepared.close();
    }
  }

  raw(sql: string): Promise<void> {
    this._db.exec(sql);

    return Promise.resolve();
  }
}

class SqliteDataSource implements DataSource {
  constructor(private readonly _path: string) {}

  async transaction<T>(
    callback: (txn: Transaction) => Promise<T>
  ): Promise<T> {
    const db = new Database(this._path);

    try {
      db.exec("begin");

      const txn = new SqliteTransaction(db);
      const result = await callback(txn);

      db.exec("commit");

      return result;
    } catch (e) {
      db.exec("rollback");

      throw e;
    } finally {
      db.close();
    }
  }

  async maintenance<T>(
    callback: (txn: Transaction) => Promise<T>
  ): Promise<T> {
    const db = new Database(this._path);

    try {
      db.exec("pragma foreign_keys=off");
      db.exec("begin");

      const txn = new SqliteTransaction(db);
      const result = await callback(txn);

      const fkViolations = db.prepare("pragma foreign_key_check").all();

      if (fkViolations.length > 0) {
        debug("Foreign key violations: %O", fkViolations);

        throw new MaintenanceError(
          "Maintenance failed, db unchanged. Consult 'app:sqlite' debug log.",
          fkViolations
        );
      }

      db.exec("commit");

      return result;
    } catch (e) {
      db.exec("rollback");

      throw e;
    } finally {
      db.close();
    }
  }

  vacuum(): Promise<void> {
    const db = new Database(this._path);

    try {
      db.exec("vacuum");
    } finally {
      db.close();
    }

    return Promise.resolve();
  }
}

export function openSqlite(path: string): DataSource {
  return new SqliteDataSource(path);
}
