import { LoadConfigRequest } from "../request/loadConfig";
import { LoadConfigResponse } from "../response/loadConfig";
import { World } from "../world";

export function loadConfig(
  w: World,
  req: LoadConfigRequest
): LoadConfigResponse {
  return {
    type: "load_config_res",
    status: 1,
  };
}
