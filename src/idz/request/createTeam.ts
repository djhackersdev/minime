import { ExtId } from "../model/base";
import { Profile } from "../model/profile";

export interface CreateTeamRequest {
  type: "create_team_req";
  profileId: ExtId<Profile>; // u32
  teamName: string; // len 0x20
  field_0028: number; // u16
  field_002C: number; // u32 (but only holds a u8)
  nameBg: number; // u8
  field_0032: number; // u16
  prevTeamId: number; // u32
  field_0038: Buffer; // len 0x0D ..? weird length
}
