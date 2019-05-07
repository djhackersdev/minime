import { LoadConfigRequest } from "../request/loadConfig";
import { LoadConfigResponse } from "../response/loadConfig";
import { Repositories } from "../repo";

export function loadConfig(
  w: Repositories,
  req: LoadConfigRequest
): LoadConfigResponse {
  return {
    type: "load_config_res",
    status: 1,
    serverVersion: 130,
  };
}
