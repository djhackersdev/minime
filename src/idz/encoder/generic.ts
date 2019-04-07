import { GenericResponse } from "../response/generic";

export function generic(res: GenericResponse) {
  const buf = Buffer.alloc(0x0020);

  buf.writeInt16LE(0x0001, 0x0000);
  buf.writeInt32LE(res.status || 0, 0x0004);

  return buf;
}
