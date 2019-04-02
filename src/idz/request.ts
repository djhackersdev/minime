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

export interface CreateProfileRequest {
  type: "create_profile_req";
  aimeId: number;
  luid: string;
  name: string;
  field_0034: number;
  field_0040: Buffer;
  car_type: number;
  car_color: number;
  transmission: "auto" | "manual";
  field_008A: number;
  field_008C: number;
  field_0090: bigint;
  field_009C: number;
  gender: "male" | "female";
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

export interface Load2on2Request {
  type: "load_2on2_req";
  field_0002: number;
  field_0004: number;
  field_0008: number;
}

export interface LoadConfigRequest {
  type: "load_config_req";
}

export interface LoadConfigRequest2 {
  type: "load_config_v2_req";
}

export interface DiscoverProfileRequest {
  type: "discover_profile_req";
  aimeId: number;
}

export interface LoadGeneralRewardRequest {
  type: "load_general_reward_req";
  field_0004: number;
}

export interface LoadProfileRequest {
  type: "load_profile_req";
  aimeId: number;
  pcbId: string;
}

export interface LoadRewardTableRequest {
  type: "load_reward_table_req";
}

export interface LoadServerListRequest {
  type: "load_server_list_req";
}

export interface LoadStockerRequest {
  type: "load_stocker_req";
  field_0004: number;
}

export interface LoadTeamRequest {
  type: "load_team_req";
  teamId: number;
  field_0008: number;
}

export interface SaveExpeditionRequest {
  type: "save_expedition_req";
  field_0004: number;
}

export interface UpdateProvisionalStoreRankRequest {
  type: "update_provisional_store_rank_req";
  aimeId: number;
}

export interface SaveProfileRequest {
  type: "save_profile_req";
  // TODO
}

export interface UpdateStoryClearNumRequest {
  type: "update_story_clear_num_req";
}

export interface SaveTopicRequest {
  type: "save_topic_req";
  aimeId?: number;
}

export type Request =
  | AccountLockRequest
  | AccountUnlockRequest
  | CreateProfileRequest
  | CreateTeamRequest
  | Load2on2Request
  | LoadConfigRequest
  | LoadConfigRequest2
  | DiscoverProfileRequest
  | LoadGeneralRewardRequest
  | LoadProfileRequest
  | LoadRewardTableRequest
  | LoadServerListRequest
  | LoadStockerRequest
  | LoadTeamRequest
  | SaveExpeditionRequest
  | UpdateProvisionalStoreRankRequest
  | SaveProfileRequest
  | UpdateStoryClearNumRequest
  | SaveTopicRequest;
