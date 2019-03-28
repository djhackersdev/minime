export interface AccountLockRequest {
  type: "account_lock_req";
  field_0002: number;
  field_0004: number;
  field_0008: Buffer;
  field_0018: number;
}

export interface GetConfigDataRequest {
  type: "get_config_data_req";
}

export interface GetConfigDataRequest2 {
  type: "get_config_data_2_req";
}

export interface GetServerListRequest {
  type: "get_server_list_req";
}

export type Request =
  | AccountLockRequest
  | GetConfigDataRequest
  | GetConfigDataRequest2
  | GetServerListRequest;
