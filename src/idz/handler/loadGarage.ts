import { LoadGarageRequest } from "../request/loadGarage";
import { LoadGarageResponse } from "../response/loadGarage";
import { World } from "../world";

export async function loadGarage(
  w: World,
  req: LoadGarageRequest
): Promise<LoadGarageResponse> {
  return {
    type: "load_garage_res",
    cars: await w.car().loadAllCars(req.profileId),
  };
}
