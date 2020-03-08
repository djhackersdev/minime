import { Repositories } from "../repo";
import { LoadEventInfoRequest } from "../request/loadEventInfo";
import { LoadEventInfoResponse } from "../response/loadEventInfo";

export function loadEventInfo(
  w: Repositories,
  req: LoadEventInfoRequest
): LoadEventInfoResponse {
  return {
    type: "load_event_info_res",
  };
}
