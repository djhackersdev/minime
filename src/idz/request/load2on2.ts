import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Team } from "../model/team";

export interface Load2on2Request {
  type: "load_2on2_req";
  field_0002: number;
  profileId: ExtId<Profile>;
  teamId: ExtId<Team>;
}
