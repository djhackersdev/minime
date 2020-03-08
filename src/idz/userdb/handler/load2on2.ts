import { Load2on2Request } from "../request/load2on2";
import { Load2on2Response } from "../response/load2on2";
import { Repositories } from "../repo";

export function load2on2(
  w: Repositories,
  req: Load2on2Request
): Load2on2Response {
  return {
    type: "load_2on2_res",
    format: req.format as any,
  };
}
