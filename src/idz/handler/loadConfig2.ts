import { LoadConfigRequest2 } from "../request/loadConfig2";
import { LoadConfigResponse2 } from "../response/loadConfig2";
import { World } from "../world";

export function loadConfig2(
  w: World,
  req: LoadConfigRequest2
): LoadConfigResponse2 {
  return {
    type: "load_config_v2_res",
    status: 1,
  };
}
