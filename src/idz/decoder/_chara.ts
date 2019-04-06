import { Chara } from "../model/chara";

export function chara(buf: Buffer): Chara {
  return {
    gender: buf.readUInt16LE(0x00) === 0 ? "male" : "female",
    clothing: buf.readUInt16LE(0x02),
    mouth: buf.readUInt16LE(0x04),
    field_06: buf.readUInt16LE(0x06),
    field_08: buf.readUInt16LE(0x08),
    field_0A: buf.readUInt16LE(0x0a),
    field_0C: buf.readUInt16LE(0x0c),
    field_0E: buf.readUInt16LE(0x0e),
  };
}
