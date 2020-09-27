import { Car } from "../model/car";
import { AimeId } from "../../../model";

export interface SaveNewCarRequest {
  type: "save_new_car_req";
  aimeId: AimeId;
  version: number;
  luid: string;
  car: Car;
  field_0080: number;
}
