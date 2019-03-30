export interface AccountLockRequest {
  type: "account_lock_req";
  aimeId: number;
  pcbId: string;
  field_0018: number;
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

export interface GetServerListRequest {
  type: "get_server_list_req";
}

export type Request =
  | AccountLockRequest
  | CreateTeamRequest
  | GetConfigRequest
  | GetConfigRequest2
  | GetServerListRequest;
