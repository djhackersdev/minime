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

export interface Get2on2Response {
  type: "get_2on2_res";
  // TODO?
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

export interface GetRecordResponse1 {
  type: "get_record_v1_res";
  // giga TODO
}

export interface GetRecordResponse2 {
  type: "get_record_v2_res";
  // giga TODO
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

export interface GetStockerResponse {
  type: "get_stocker_res";
  status: number;
  // mega TODO
}

export interface GetTeamResponse {
  type: "get_team_res";
  name: string;
  // giga TODO
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

export interface UpdateStoryClearNumResponse {
  type: "update_story_clear_num_res";
  // TODO, looks like a table of 9 * 10 u32 fields
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
  | Get2on2Response
  | GetConfigResponse
  | GetConfigResponse2
  | GetExistRecordResponse
  | GetRecordResponse1
  | GetRecordResponse2
  | GetRewardTableResponse
  | GetServerListResponse
  | GetStockerResponse
  | GetTeamResponse
  | UpdateProvisionalStoreRankResponse
  | UpdateStoryClearNumResponse
  | UpdateTopicResponse;
