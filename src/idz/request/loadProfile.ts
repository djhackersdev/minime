import { AimeId } from "../../model";

interface LoadProfileRequestBase {
  type: "load_profile_req";
  aimeId: AimeId;
  luid: string;
}

export interface LoadProfileRequest2 extends LoadProfileRequestBase {
  format: 2;
}

export interface LoadProfileRequest3 extends LoadProfileRequestBase {
  format: 3;
}

export type LoadProfileRequest = LoadProfileRequest2 | LoadProfileRequest3;
