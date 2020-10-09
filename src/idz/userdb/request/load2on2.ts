import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { AimeId } from "../../../model";

export interface Load2on2Request {
  type: "load_2on2_req";
  field_0002: number;
  aimeId: AimeId;
  teamId: ExtId<Team>;
}
