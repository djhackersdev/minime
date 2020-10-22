import { LoadConfigRequest } from "../request/loadConfig";

loadConfig1.msgCode = 0x0004;
loadConfig1.msgLen = 0x0050;

export function loadConfig1(): LoadConfigRequest {
  return { type: "load_config_req" };
}

loadConfig2.msgCode = 0x00ab;
loadConfig2.msgLen = 0x0010;

export function loadConfig2(): LoadConfigRequest {
  return { type: "load_config_req" };
}
