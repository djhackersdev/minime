import { SaveNewCarRequest } from "../request/saveNewCar";
import { SaveNewCarResponse } from "../response/saveNewCar";
import { World } from "../world";

export function saveNewCar(
  w: World,
  req: SaveNewCarRequest
): SaveNewCarResponse {
  return {
    type: "save_new_car_res",
    status: 0,
  };
}
