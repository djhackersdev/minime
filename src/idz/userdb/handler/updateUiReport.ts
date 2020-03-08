import { UpdateUiReportRequest } from "../request/updateUiReport";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export function updateUiReport(
  w: Repositories,
  req: UpdateUiReportRequest
): GenericResponse {
  return { type: "generic_res" };
}
