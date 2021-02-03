import { LoadConfigRequestA, LoadConfigRequestB } from "../request/loadConfig";

loadConfigA_1.msgCode = 0x0004;
loadConfigA_1.msgLen = 0x0050;

export function loadConfigA_1(): LoadConfigRequestA {
  return { type: "load_config_A_req" };
}

loadConfigB_1.msgCode = 0x00ab;
loadConfigB_1.msgLen = 0x0010;

export function loadConfigB_1(): LoadConfigRequestB {
  return { type: "load_config_B_req" };
}

loadConfigA_2.msgCode = 0x0004;
loadConfigA_2.msgLen = 0x0050;

export function loadConfigA_2(): LoadConfigRequestA {
  return { type: "load_config_A_req" };
}

loadConfigB_2.msgCode = 0x00a0;
loadConfigB_2.msgLen = 0x0010;

export function loadConfigB_2(): LoadConfigRequestB {
  return { type: "load_config_B_req" };
}
