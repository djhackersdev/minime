import { AimeId } from "../../../model";

export interface LoadGarageRequest {
  type: "load_garage_req";
  aimeId: AimeId;
  version: number;
  fetchOffset: number;
  field_000A: number;
}
