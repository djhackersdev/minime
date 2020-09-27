import { AimeId } from "../../../model";

export interface CreateTeamRequest {
  type: "create_team_req";
  aimeId: AimeId;
  version: number;
  teamName: string; // len 0x20
  field_0028: number; // u16
  field_002C: number; // u32 (but only holds a u8)
  nameBg: number; // u8
  field_0032: number; // u16
  prevTeamId: number; // u32
  pcbId: string;
}
