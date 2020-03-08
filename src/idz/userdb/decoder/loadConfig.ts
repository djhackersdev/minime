import { LoadConfigRequest } from "../request/loadConfig";

loadConfig.msgCode = 0x0004;
loadConfig.msgLen = 0x0050;

export function loadConfig(): LoadConfigRequest {
  return { type: "load_config_req" };
}
