import { SaveNewCarRequest } from "../request/saveNewCar";
import { SaveNewCarResponse } from "../response/saveNewCar";
import { Repositories } from "../repo";

export async function saveNewCar(
  w: Repositories,
  req: SaveNewCarRequest
): Promise<SaveNewCarResponse> {
  const profileId = await w.profile().find(req.aimeId, req.version);

  await w.car().saveCar(profileId, req.car);

  return {
    type: "save_new_car_res",
    status: 0,
  };
}
