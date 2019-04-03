import { RequestCode } from "../defs";
import { LoadServerListRequest } from "../request/loadServerList";

loadServerList.msgCode = 0x0006 as RequestCode;
loadServerList.msgLen = 0x0020;

export function loadServerList(): LoadServerListRequest {
  return { type: "load_server_list_req" };
}
