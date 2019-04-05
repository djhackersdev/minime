import { Car } from "../model/car";

export function car(buf: Buffer): Car {
  const field_04: number[] = [];

  for (let i = 0; i < 32; i++) {
    field_04.push(buf.readUInt16LE(0x0004 + 2 * i));
  }

  return {
    field_00: buf.readUInt16LE(0x0000),
    field_02: buf.readUInt16LE(0x0002),
    field_04,
    model: buf.readUInt16LE(0x0044),
    color: buf.readUInt16LE(0x0046),
    transmission: buf.readUInt16LE(0x0048),
    field_4A: buf.readUInt16LE(0x004a),
    field_4C: buf.readUInt32LE(0x004c),
    field_50_lo: buf.readUInt32LE(0x0050),
    field_50_hi: buf.readUInt32LE(0x0054),
    field_58: buf.readUInt16LE(0x0058),
    field_5A: buf.readUInt8(0x005a),
    field_5B: buf.readUInt8(0x005b),
    field_5C: buf.readUInt16LE(0x005c),
    field_5E: buf.readUInt16LE(0x005e),
  };
}
