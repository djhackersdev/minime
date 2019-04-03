//
// Common defs
//

export interface TeamMember {
  name: string;
  lv: number;
  monthPoints: number;
}

export interface BaseTeamResponse {
  name: string;
  members: TeamMember[];
  // giga TODO
}

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
  // a bunch of other stuff here! total size is 0x20
}

export interface CreateTeamResponse extends BaseTeamResponse {
  type: "create_team_res";
}

export interface Load2on2Response {
  type: "load_2on2_res";
  // TODO?
}

export interface LoadConfigResponse {
  type: "load_config_res";
  status: number;
}

export interface LoadConfigResponse2 {
  type: "load_config_v2_res";
  status: number;
}

export interface DiscoverProfileResponse {
  type: "discover_profile_res";
  result: boolean;
}

export interface LoadGeneralRewardResponse {
  type: "load_general_reward_res";
  // TODO
}

export interface LoadRecordResponse1 {
  type: "load_record_v1_res";
}

export interface LoadRecordResponse2 {
  type: "load_record_v2_res";
  name: string;
  profileId: number;
  lv: number;
  fame: number;
  dpoint: number;
  teamId: number;
  // giga TODO
}

export interface LoadRewardTableResponse {
  type: "load_reward_table_res";
  // TODO
}

export interface LoadServerListResponse {
  type: "load_server_list_res";
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

export interface LoadStockerResponse {
  type: "load_stocker_res";
  status: number;
  // mega TODO
}

export interface LoadTeamResponse extends BaseTeamResponse {
  type: "load_team_res";
}

export interface UpdateExpeditionResponse {
  type: "save_expedition_res";
  // tera TODO
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

export interface SaveTopicResponse {
  type: "save_topic_res";
  // mega TODO
}

export type Response =
  | AccountLockResponse
  | AccountUnlockResponse
  | CreateTeamResponse
  | GenericResponse
  | Load2on2Response
  | LoadConfigResponse
  | LoadConfigResponse2
  | DiscoverProfileResponse
  | LoadGeneralRewardResponse
  | LoadRecordResponse1
  | LoadRecordResponse2
  | LoadRewardTableResponse
  | LoadServerListResponse
  | LoadStockerResponse
  | LoadTeamResponse
  | UpdateExpeditionResponse
  | UpdateProvisionalStoreRankResponse
  | UpdateStoryClearNumResponse
  | SaveTopicResponse;
