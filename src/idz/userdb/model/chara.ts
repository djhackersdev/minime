import { BackgroundCode, TitleCode } from "./base";

export type Gender = "male" | "female";

export interface Chara {
  gender: Gender;
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
