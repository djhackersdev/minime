import { TimeAttackScore } from "../model/timeAttack";
import { AimeId } from "../../../model";

export interface SaveTimeAttackRequest {
  type: "save_time_attack_req";
  aimeId: AimeId;
  version: number;
  dayNight: number;
  payload: TimeAttackScore;
  field_0002: number; // u16, always 1
  field_0008: number; // u32
  field_0012: number; // u8
  field_0015: number; // u8
  field_005D: number; // u8
  field_005E: number; // u16
  field_0060: number; // u16
}
