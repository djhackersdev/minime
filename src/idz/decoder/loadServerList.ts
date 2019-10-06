import { LoadServerListRequest } from "../request/loadServerList";

loadServerList.msgCode = 0x0006;
loadServerList.msgLen = 0x0020;

export function loadServerList(): LoadServerListRequest {
  return { type: "load_server_list_req" };
}
