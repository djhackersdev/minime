export interface LoadGeneralRewardItem {
  field_04: string; // 40 chars max
  field_2C: number; // payload?
  field_38: number; // u8
  field_39: number; // u8
  field_3C: number[]; // u32 * 4
}

export interface LoadGeneralRewardResponse {
  type: "load_general_reward_res";
  items: LoadGeneralRewardItem[];
}
