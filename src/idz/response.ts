export interface AccountLockResponse {
  type: "account_lock_res";
  field_0018: number;
  field_001A: number;
  field_001C: Date;
}

export interface AccountUnlockResponse {
  type: "account_unlock_res";
  status: number;
}

export interface GenericResponse {
  type: "generic_res";
  status: number;
}

export interface CreateTeamResponse {
  type: "create_team_res";
  name: string;
}

export interface GetConfigResponse {
  type: "get_config_res";
  status: number;
}

export interface GetConfigResponse2 {
  type: "get_config_2_res";
  status: number;
}

export interface GetExistRecordResponse {
  type: "get_exist_record_res";
  result: boolean;
}

export interface GetRewardTableResponse {
  type: "get_reward_table_res";
  // TODO
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

export interface UpdateProvisionalStoreRankResponseRow {
  field_0000: number;
  field_0004: number;
  field_0010: string;
  field_003B: string;
}

export interface UpdateProvisionalStoreRankResponse {
  type: "update_provisional_store_rank_res";
  rows: UpdateProvisionalStoreRankResponseRow[];
}

export interface UpdateTopicResponse {
  type: "update_topic_res";
  // mega TODO
}

export type Response =
  | AccountLockResponse
  | AccountUnlockResponse
  | CreateTeamResponse
  | GenericResponse
  | GetConfigResponse
  | GetConfigResponse2
  | GetExistRecordResponse
  | GetRewardTableResponse
  | GetServerListResponse
  | UpdateProvisionalStoreRankResponse
  | UpdateTopicResponse;
