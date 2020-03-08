import { AimeId } from "../../../model";

export interface LoadEventInfoRequest {
  type: "load_event_info_req";
  aimeId: AimeId;
}
