import iconv from "iconv-lite";

const ASCII = "ascii";
const SHIFT_JIS = "shift_jis";

function readStr(buf: Buffer, begin: number, end: number, encoding: string) {
  end = Math.min(buf.indexOf(0, begin), end);

  return iconv.decode(buf.slice(begin, end), encoding);
}

export function readAsciiStr(buf: Buffer, begin: number, end: number) {
  return readStr(buf, begin, end, ASCII);
}

export function readSjisStr(buf: Buffer, begin: number, end: number) {
  return readStr(buf, begin, end, SHIFT_JIS);
}

// WARNING: This is sent little-endian.
export function writeIpAddr(buf: Buffer, str: string, pos: number) {
  const bits = str.split(".");

  for (let i = 0; i < 4; i++) {
    buf.writeUInt8(parseInt(bits[3 - i]), pos + i);
  }
}

function writeStr(
  buf: Buffer,
  begin: number,
  end: number,
  str: string,
  encoding: string
) {
  const tmp = iconv.encode(str, encoding);

  if (tmp.length >= end - begin) {
    throw new Error("String field overflow");
  }

  tmp.copy(buf, begin);
  buf.writeUInt8(0, begin + tmp.length);
}

export function writeAsciiStr(
  buf: Buffer,
  begin: number,
  end: number,
  str: string
) {
  writeStr(buf, begin, end, str, ASCII);
}

export function writeSjisStr(
  buf: Buffer,
  begin: number,
  end: number,
  str: string
) {
  writeStr(buf, begin, end, str, SHIFT_JIS);
}
