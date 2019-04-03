export interface CreateProfileRequest {
  type: "create_profile_req";
  aimeId: number;
  luid: string;
  name: string;
  field_0034: number;
  field_0040: Buffer;
  car_type: number;
  car_color: number;
  transmission: "auto" | "manual";
  field_008A: number;
  field_008C: number;
  field_0090: bigint;
  field_009C: number;
  gender: "male" | "female";
  field_00A2: number;
  field_00A4: number;
  field_00A6: number;
  field_00A8: number;
  field_00AA: number;
  field_00AC: number;
  field_00AE: number;
  field_00B0: number;
  field_00B2: number;
}
