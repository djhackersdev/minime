import { AimeId } from "../model/base";

export interface LoadProfileRequest {
  type: "load_profile_req";
  aimeId: AimeId;
  pcbId: string;
}
