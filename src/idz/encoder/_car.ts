import { Car } from "../model/car";

export function car(car: Car): Buffer {
  const buf = Buffer.alloc(0x0060);

  buf.writeUInt16LE(car.field_00, 0x0000);
  buf.writeUInt16LE(car.field_02, 0x0002);

  for (let i = 0; i < 32; i++) {
    buf.writeUInt16LE(
      i < car.field_04.length ? car.field_04[i] : 0xff00,
      0x0004 + 2 * i
    );
  }

  buf.writeUInt16LE(car.field_44, 0x0044);
  buf.writeUInt16LE(car.field_46, 0x0046);
  buf.writeUInt16LE(car.field_48, 0x0048);
  buf.writeUInt16LE(car.field_4A, 0x004a);
  buf.writeUInt32LE(car.field_4C, 0x004c);
  buf.writeUInt32LE(car.field_50_lo, 0x0050);
  buf.writeUInt32LE(car.field_50_hi, 0x0050);
  buf.writeUInt16LE(car.field_58, 0x0058);
  buf.writeUInt8(car.field_5A, 0x005a);
  buf.writeUInt8(car.field_5B, 0x005b);
  buf.writeUInt16LE(car.field_5C, 0x005c);
  buf.writeUInt16LE(car.field_5E, 0x005e);

  return buf;
}
