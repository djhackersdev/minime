import { Car, CarSelector } from "../model/car";

export function car(buf: Buffer): Car {
  const field_04: number[] = [];

  for (let i = 0; i < 32; i++) {
    field_04.push(buf.readUInt16LE(0x0004 + 2 * i));
  }

  return {
    field_00: buf.readUInt16LE(0x0000),
    field_02: buf.readUInt16LE(0x0002),
    field_04,
    selector: buf.readUInt16LE(0x0044) as CarSelector,
    field_46: buf.readUInt16LE(0x0046),
    field_48: buf.readUInt16LE(0x0048),
    field_4a: buf.readUInt16LE(0x004a),
    field_4c: buf.readUInt32LE(0x004c),
    field_50_lo: buf.readUInt32LE(0x0050),
    field_50_hi: buf.readUInt32LE(0x0054),
    field_58: buf.readUInt16LE(0x0058),
    field_5a: buf.readUInt8(0x005a),
    field_5b: buf.readUInt8(0x005b),
    field_5c: buf.readUInt16LE(0x005c),
    field_5e: buf.readUInt16LE(0x005e),
  };
}
