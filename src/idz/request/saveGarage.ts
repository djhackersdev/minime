import { Car } from "../model/car";

export interface SaveGarageRequest {
  type: "save_garage_req";
  aimeId: number;
  payload: Car;
  field_0068: number[];
  field_0080: number;
  field_0081: boolean;
}
