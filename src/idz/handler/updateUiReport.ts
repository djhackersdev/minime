import { UpdateUiReportRequest } from "../request/updateUiReport";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function updateUiReport(
  w: World,
  req: UpdateUiReportRequest
): GenericResponse {
  return { type: "generic_res" };
}
