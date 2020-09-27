import { AimeId } from "../../../model";

export interface CreateAutoTeamRequest {
  type: "create_auto_team_req";
  aimeId: AimeId;
  version: number;
  field_0008: number;
  field_000C: number;
}
