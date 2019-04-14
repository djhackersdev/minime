import { Id } from "../model/base";
import { Car } from "../model/car";
import { Profile } from "../model/profile";

export interface SaveNewCarRequest {
  type: "save_new_car_req";
  profileId: Id<Profile>;
  luid: string;
  car: Car;
  field_0080: number;
}
