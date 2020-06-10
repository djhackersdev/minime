import { AimeId } from "../model";

export type RegisterLevel = "none" | "portal" | "segaid";

export interface AimeResponseBase {
  status: number;
}

export interface FeliCaLookupResponse extends AimeResponseBase {
  type: "felica_lookup";
  accessCode: string;
}

export interface FeliCaLookup2Response extends AimeResponseBase {
  type: "felica_lookup2";
  accessCode: string;
  aimeId?: AimeId;
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
  aimeId?: AimeId;
  registerLevel: RegisterLevel;
}

export interface LookupResponse2 extends AimeResponseBase {
  type: "lookup2";
  status: number;
  aimeId?: AimeId;
  registerLevel: RegisterLevel;
}

export interface RegisterResponse extends AimeResponseBase {
  type: "register";
  aimeId: number;
}

export type AimeResponse =
  | FeliCaLookupResponse
  | FeliCaLookup2Response
  | CampaignResponse
  | HelloResponse
  | LogResponse
  | LookupResponse
  | LookupResponse2
  | RegisterResponse;
