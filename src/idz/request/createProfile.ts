import { Car } from "../model/car";
import { Chara } from "../model/chara";

export interface CreateProfileRequest {
  type: "create_profile_req";
  aimeId: number;
  luid: string;
  name: string;
  field_0034: number;
  car: Car;
  chara: Chara;
}
