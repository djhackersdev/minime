import { Chara } from "../model/chara";

export function encodeChara1(chara: Chara): Buffer {
  const buf = Buffer.alloc(0x0014);

  buf.writeUInt8(chara.gender === "male" ? 0 : 1, 0x00);
  buf.writeUInt16LE(chara.field_02, 0x02);
  buf.writeUInt16LE(chara.field_04, 0x04);
  buf.writeUInt16LE(chara.field_06, 0x06);
  buf.writeUInt16LE(chara.field_08, 0x08);
  buf.writeUInt16LE(chara.field_0a, 0x0a);
  buf.writeUInt16LE(chara.field_0c, 0x0c);
  buf.writeUInt16LE(chara.field_0e, 0x0e);
  buf.writeUInt16LE(chara.background, 0x10); // Swapped on save
  buf.writeUInt16LE(chara.title, 0x12); // Swapped on save

  return buf;
}

export function encodeChara2(chara: Chara): Buffer {
  const buf = Buffer.alloc(0x0016);

  buf.writeUInt8(chara.gender === "male" ? 0 : 1, 0x00);
  buf.writeUInt16LE(chara.field_02, 0x02);
  buf.writeUInt16LE(chara.field_04, 0x04);
  buf.writeUInt16LE(chara.field_06, 0x06);
  buf.writeUInt16LE(chara.field_08, 0x08);
  buf.writeUInt16LE(chara.field_0a, 0x0a);
  buf.writeUInt16LE(chara.field_0c, 0x0c);
  buf.writeUInt16LE(chara.field_0e, 0x0e);
  buf.writeUInt16LE(chara.background, 0x10);
  buf.writeUInt16LE(chara.title, 0x14);

  return buf;
}
