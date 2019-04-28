export type RegisterLevel = "none" | "portal" | "segaid";

export interface AimeResponseBase {
  status: number;
}

export interface CampaignResponse extends AimeResponseBase {
  type: "campaign";
}

export interface HelloResponse extends AimeResponseBase {
  type: "hello";
}

export interface LogResponse extends AimeResponseBase {
  type: "log";
}

export interface LookupResponse extends AimeResponseBase {
  type: "lookup";
  status: number;
  aimeId?: number;
  registerLevel: RegisterLevel;
}

export interface LookupResponse2 extends AimeResponseBase {
  type: "lookup2";
  status: number;
  aimeId?: number;
  registerLevel: RegisterLevel;
}

export interface RegisterResponse extends AimeResponseBase {
  type: "register";
  aimeId: number;
}

export type AimeResponse =
  | CampaignResponse
  | HelloResponse
  | LogResponse
  | LookupResponse
  | LookupResponse2
  | RegisterResponse;
