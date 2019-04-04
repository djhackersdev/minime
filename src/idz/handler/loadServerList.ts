import { hostname } from "os";

import { LoadServerListRequest } from "../request/loadServerList";
import { LoadServerListResponse } from "../response/loadServerList";
import { World } from "../world";

export function loadServerList(
  w: World,
  req: LoadServerListRequest
): LoadServerListResponse {
  const myHost = hostname();

  return {
    type: "load_server_list_res",
    status: 1,
    userDb: {
      addr: myHost,
      tcp: 10000,
      http: 10001,
    },
    matchAddr: myHost,
    matchPort: {
      tcp: 10002,
      udpSend: 10003,
      udpRecv: 10004,
    },
    tagMatchPort: {
      tcp: 10005,
      udpSend: 10006,
      udpRecv: 10007,
    },
    event: {
      addr: myHost,
      tcp: 10008,
    },
    screenshot: {
      addr: myHost,
      tcp: 10009,
    },
    pingReturn: myHost,
    echo1: {
      addr: myHost,
      udp: 10010,
    },
    echo2: {
      addr: myHost,
      udp: 10011,
    },
    newsUrl: `http://${myHost}:10012/news`,
    reportErrorUrl: `http://${myHost}:10013/error`,
  };
}
