import { BackgroundCode, TitleCode } from "./base";

export interface Chara {
  gender: "male" | "female";
  clothing: number;
  mouth: number;
  field_06: number;
  field_08: number;
  field_0A: number;
  field_0C: number;
  field_0E: number;
  title: TitleCode;
  background: BackgroundCode;
}
