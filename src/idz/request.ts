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
  field_0018: Buffer;
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

export interface GetServerListRequest {
  type: "get_server_list_req";
}

export interface UpdateProvisionalStoreRankRequest {
  type: "update_provisional_store_rank_req";
  aimeId: number;
}

export interface UpdateRecordRequest {
  type: "update_record_req";
  // TODO
}

export type Request =
  | AccountLockRequest
  | AccountUnlockRequest
  | CreateRecordRequest
  | CreateTeamRequest
  | GetConfigRequest
  | GetConfigRequest2
  | GetExistRecordRequest
  | GetServerListRequest
  | UpdateProvisionalStoreRankRequest
  | UpdateRecordRequest;
