import { LoadConfigRequest2 } from "../request/loadConfig2";

loadConfig2.msgCode = 0x00ab;
loadConfig2.msgLen = 0x0010;

export function loadConfig2(): LoadConfigRequest2 {
  return { type: "load_config_v2_req" };
}
