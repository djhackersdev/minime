import { Car } from "../model/car";
import { AimeId } from "../../../model";

export interface SaveGarageRequest {
  type: "save_garage_req";
  version: number;
  aimeId: AimeId;
  car: Car;
  field_0068: number[];
  field_0080: number;
  field_0081: boolean;
}
