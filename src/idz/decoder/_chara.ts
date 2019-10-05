import { BackgroundCode, TitleCode } from "../model/base";
import { Chara } from "../model/chara";

export function chara(buf: Buffer): Chara {
  return {
    gender: buf.readUInt16LE(0x00) === 0 ? "male" : "female",
    field_02: buf.readUInt16LE(0x02),
    field_04: buf.readUInt16LE(0x04),
    field_06: buf.readUInt16LE(0x06),
    field_08: buf.readUInt16LE(0x08),
    field_0a: buf.readUInt16LE(0x0a),
    field_0c: buf.readUInt16LE(0x0c),
    field_0e: buf.readUInt16LE(0x0e),
    title: buf.readUInt16LE(0x10) as TitleCode, // Swapped on load
    background: buf.readUInt16LE(0x12) as BackgroundCode, // Swapped on load
  };
}
