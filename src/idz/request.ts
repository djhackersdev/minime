export interface AccountLockRequest {
  type: "account_lock_req";
  aimeId: number;
  pcbId: string;
  field_0018: number;
}

export interface AccountUnlockRequest {
  type: "account_unlock_req";
  aimeId: number;
  pcbId: string;
}

export interface CreateRecordRequest {
  type: "create_record_req";
  aimeId: number;
  luid: string;
  name: string;
  field_0034: number;
  field_0040: Buffer;
  field_0084: number;
  field_0086: number;
  field_0088: number;
  field_008A: number;
  field_008C: number;
  field_0090: bigint;
  field_009C: number;
  field_00A0: number;
  field_00A2: number;
  field_00A4: number;
  field_00A6: number;
  field_00A8: number;
  field_00AA: number;
  field_00AC: number;
  field_00AE: number;
  field_00B0: number;
  field_00B2: number;
}

export interface CreateTeamRequest {
  type: "create_team_req";
  field_0004: number;
  field_0008: number;
  field_000C: number;
}

export interface Get2on2Request {
  type: "get_2on2_req";
  field_0002: number;
  field_0004: number;
  field_0008: number;
}

export interface GetConfigRequest {
  type: "get_config_req";
}

export interface GetConfigRequest2 {
  type: "get_config_2_req";
}

export interface GetExistRecordRequest {
  type: "get_exist_record_req";
  aimeId: number;
}

export interface GetGeneralRewardRequest {
  type: "get_general_reward_req";
  field_0004: number;
}

export interface GetRecordRequest {
  type: "get_record_req";
  aimeId: number;
  pcbId: string;
}

export interface GetRewardTableRequest {
  type: "get_reward_table_req";
}

export interface GetServerListRequest {
  type: "get_server_list_req";
}

export interface GetStockerRequest {
  type: "get_stocker_req";
  aimeId: number;
}

export interface GetTeamRequest {
  type: "get_team_req";
  field_0004: number;
  field_0008: number;
}

export interface UpdateProvisionalStoreRankRequest {
  type: "update_provisional_store_rank_req";
  aimeId: number;
}

export interface UpdateRecordRequest {
  type: "update_record_req";
  // TODO
}

export interface UpdateStoryClearNumRequest {
  type: "update_story_clear_num_req";
}

export interface UpdateTopicRequest {
  type: "update_topic_req";
  aimeId?: number;
}

export type Request =
  | AccountLockRequest
  | AccountUnlockRequest
  | CreateRecordRequest
  | CreateTeamRequest
  | Get2on2Request
  | GetConfigRequest
  | GetConfigRequest2
  | GetExistRecordRequest
  | GetGeneralRewardRequest
  | GetRecordRequest
  | GetRewardTableRequest
  | GetServerListRequest
  | GetStockerRequest
  | GetTeamRequest
  | UpdateProvisionalStoreRankRequest
  | UpdateRecordRequest
  | UpdateStoryClearNumRequest
  | UpdateTopicRequest;
