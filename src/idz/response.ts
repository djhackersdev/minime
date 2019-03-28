export interface GetConfigDataResponse {
  type: "get_config_data_res";
  status: number;
}

export interface GetConfigDataResponse2 {
  type: "get_config_data_2_res";
  status: number;
}

export interface GetServerListResponse {
  type: "get_server_list_res";
  status: number;
  userDb: {
    addr: string;
    tcp: number;
    http: number;
  };
  matchAddr: string;
  matchPort: {
    tcp: number;
    udpSend: number;
    udpRecv: number;
  };
  tagMatchPort: {
    tcp: number;
    udpSend: number;
    udpRecv: number;
  };
  event: {
    addr: string;
    tcp: number;
  };
  screenshot: {
    addr: string;
    tcp: number;
  };
  pingReturn: string;
  echo1: {
    addr: string;
    udp: number;
  };
  echo2: {
    addr: string;
    udp: number;
  };
  newsUrl: string;
  reportErrorUrl: string;
}

export type Response =
  | GetConfigDataResponse
  | GetConfigDataResponse2
  | GetServerListResponse;
