import { GenericResponse } from "../response/generic";

export function generic1(res: GenericResponse) {
  const buf = Buffer.alloc(0x0020);

  buf.writeInt16LE(0x0001, 0x0000);
  buf.writeInt32LE(res.status || 0, 0x0004);

  return buf;
}

export function generic2(res: GenericResponse) {
  const buf = Buffer.alloc(0x0030);

  buf.writeInt16LE(0x0001, 0x0000);
  buf.writeInt32LE(res.status || 0, 0x0004);

  // write the AIME ID for createProfile in 2.12, kinda awkward but whatever.
  buf.writeInt32LE(res.status || 0, 0x0008);

  return buf;
}
