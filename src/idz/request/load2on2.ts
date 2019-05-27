import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { AimeId } from "../../model";

interface Load2on2RequestBase {
  type: "load_2on2_req";
  field_0002: number;
  aimeId: AimeId;
  teamId: ExtId<Team>;
}

export interface Load2on2Request1 extends Load2on2RequestBase {
  format: 1;
}

export interface Load2on2Request2 extends Load2on2RequestBase {
  format: 2;
}

export type Load2on2Request = Load2on2Request1 | Load2on2Request2;
