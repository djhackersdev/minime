import format from "date-fns/format";

import { AimeId } from "../../model";

type ModelObject<T> = {
  [K in keyof T]: string | number | bigint | boolean | Date;
};

export type Crush<T extends ModelObject<T>> = {
  [K in keyof T]: string;
};

export function readAimeId(str: string): AimeId {
  return parseInt(str) as AimeId;
}

export function readBoolean(str: string): boolean {
  // The compiler will catch typos of "readBoolean". It will not catch typos
  // of "true". Which sounds like a few hours of debugging I'd prefer to
  // proactively avoid.
  return str === "true";
}

export function readDate(str: string): Date {
  // If we ever need to change this then we'll be able to do it from one place
  return new Date(str);
}

export function readWtf8(src: string): string {
  // If you read this aloud it is pronounced "Double UTF-8".
  // Which actually kind of accurately describes what's going on here.

  const buf = Buffer.alloc(src.length);

  for (let i = 0; i < src.length; i++) {
    buf.writeUInt8(src.codePointAt(i)!, i);
  }

  return buf.toString("utf-8");
}

export function writeDate(date: Date): string {
  return format(date, "YYYY-MM-DD HH:mm:ss");
}

export function writeObject<T extends ModelObject<T>>(obj: T): Crush<T> {
  const result = {} as Crush<T>;

  for (const k in obj) {
    const v = obj[k];

    if (v instanceof Date) {
      result[k] = writeDate(v);
    } else {
      result[k] = v.toString();
    }
  }

  return result;
}
