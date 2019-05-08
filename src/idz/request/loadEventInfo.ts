import { ExtId } from "../model/base";
import { Profile } from "../model/profile";

export interface LoadEventInfoRequest {
  type: "load_event_info_req";
  profileId: ExtId<Profile>;
}
