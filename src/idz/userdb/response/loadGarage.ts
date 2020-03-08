import { Car } from "../model/car";

export interface LoadGarageResponse {
  type: "load_garage_res";
  cars: Car[]; // max 10
}
