import { SaveNewCarRequest } from "../request/saveNewCar";
import { SaveNewCarResponse } from "../response/saveNewCar";
import { World } from "../world";

export async function saveNewCar(
  w: World,
  req: SaveNewCarRequest
): Promise<SaveNewCarResponse> {
  await w.car().saveCar(req.profileId, req.car);

  return {
    type: "save_new_car_res",
    status: 0,
  };
}
