import { BackgroundCode, TitleCode } from "./base";

export interface Chara {
  gender: "male" | "female";
  field_02: number;
  field_04: number;
  field_06: number;
  field_08: number;
  field_0a: number;
  field_0c: number;
  field_0e: number;
  title: TitleCode;
  background: BackgroundCode;
}
