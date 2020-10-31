import { AimeId } from "../../../model";

export interface CreateProfileResponse {
  type: "create_profile_res";
  aimeId: AimeId;
}
