import { Car } from "../model/car";
import { Chara } from "../model/chara";
import { AimeId } from "../../../model";

export interface CreateProfileRequest {
  type: "create_profile_req";
  aimeId: AimeId;
  version: number;
  luid: string;
  name: string;
  field_0034: number;
  car: Car;
  chara: Chara;
}
