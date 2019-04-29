import { AimeId } from "../../model";

export interface LoadProfileRequest {
  type: "load_profile_req";
  aimeId: AimeId;
  luid: string;
}
