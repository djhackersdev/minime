import { LoadGarageRequest } from "../request/loadGarage";
import { LoadGarageResponse } from "../response/loadGarage";
import { Repositories } from "../repo";

export async function loadGarage(
  w: Repositories,
  req: LoadGarageRequest
): Promise<LoadGarageResponse> {
  return {
    type: "load_garage_res",
    cars: await w.car().loadAllCars(req.profileId),
  };
}
