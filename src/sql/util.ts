import snakeCase from "snake-case";

import { Row } from "./api";

interface ColMapper<F> {
  _read(str: string | null): F;

  _write(val: F): string | null;
}

type Spec<R> = {
  [K in keyof R]: ColMapper<R[K]>;
};

function _nn(str: string | null): string {
  if (str === null) {
    throw new Error("Unexpected NULL returned from database");
  }

  return str;
}

/**
 * Function objects describing the precise way in which our SQL driver
 * transmits and receives values to the database as strings. Note that we could
 * potentially have more than one SQL driver so this probably needs to be
 * pushed down into `/sql/api.ts` somehow...
 */
export const T = {
  bigint: {
    _read: (str: string) => BigInt(_nn(str)),
    _write: (val: bigint) => val.toString(),
  },
  boolean: {
    _read: (str: string) => _nn(str) === "true",
    _write: (val: boolean) => val.toString(),
  },
  number: {
    _read: (str: string) => parseInt(_nn(str)),
    _write: (val: number) => val.toString(),
  },
  string: {
    _read: (str: string) => _nn(str),
    _write: (val: string) => val,
  },
  Date: {
    _read: (str: string) => new Date(_nn(str)),
    _write: (val: Date) => val.toISOString(),
  },
  nullable: <F>(inner: ColMapper<F>) => ({
    _read: (str: string | null) =>
      str !== null ? inner._read(str) : undefined,
    _write: (val: F | undefined) =>
      val !== undefined ? inner._write(val) : null,
  }),
};

/**
 * Boilerplate-reducing SQL <-> JavaScript record mapper. The TypeScript
 * compiler will ensure that the mapping is correct.
 */
export function createSqlMapper<R>(spec: Spec<R>) {
  const snaked = new Map<string, string>();
  const colNames = new Array<string>();

  for (const k in spec) {
    const sk = snakeCase(k);

    snaked.set(k, sk);
    colNames.push(sk);
  }

  function readRow(row: Row): R {
    const result = {} as R;

    for (const k in spec) {
      const sk = snaked.get(k);
      const v = spec[k]._read(row[sk!]);

      result[k] = v;
    }

    return result;
  }

  function writeRow(obj: R): Row {
    const result = {};

    for (const k in spec) {
      const sk = snaked.get(k);
      const v = spec[k]._write(obj[k]);

      result[sk!] = v;
    }

    return result;
  }

  return { readRow, writeRow, colNames };
}
