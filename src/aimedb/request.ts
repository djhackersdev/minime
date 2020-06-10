export interface AimeRequestBase {
  gameId: string;
  keychipId: string;
}

export interface FeliCaLookupRequest extends AimeRequestBase {
  type: "felica_lookup";
  idm: string;
  pmm: string;
}

export interface FeliCaLookup2Request extends AimeRequestBase {
  type: "felica_lookup2";
  idm: string;
  pmm: string;
}

export interface RegisterRequest extends AimeRequestBase {
  type: "register";
  luid: string;
}

export interface LogRequest extends AimeRequestBase {
  type: "log";
  field20: number;
  field24: number;
  field28: number;
  field2C: number;
  field30: number;
  field34: number;
  field38: number;
  field3C: number;
}

export interface CampaignRequest extends AimeRequestBase {
  type: "campaign";
}

export interface LookupRequest extends AimeRequestBase {
  type: "lookup";
  luid: string;
}

export interface LookupRequest2 extends AimeRequestBase {
  type: "lookup2";
  luid: string;
}

export interface HelloRequest extends AimeRequestBase {
  type: "hello";
}

export interface GoodbyeRequest {
  type: "goodbye";
}

export type AimeRequest =
  | FeliCaLookupRequest
  | FeliCaLookup2Request
  | CampaignRequest
  | GoodbyeRequest
  | HelloRequest
  | LogRequest
  | LookupRequest
  | LookupRequest2
  | RegisterRequest;
