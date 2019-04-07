export interface CheckRankRequest {
  type: "check_rank_req";
  field_0002: number; // u16, always 1
  field_0004: number; // u32
  field_0008: number; // u32
  field_000C: number; // u16
  field_0012: number; // u8
  field_0015: number; // u8
  field_0018: number; // u32
  field_0024: number; // u32
  field_0028: number; // u32
  field_002C: number; // u32
  field_0054: number; // u8
  field_0058: number; // u32
  field_005C: number; // u8 bit map
  field_005D: number; // u8
  field_005E: number; // u16
  field_0060: number; // u16
  field_0062: number; // u8
}
