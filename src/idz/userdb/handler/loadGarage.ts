import { LoadGarageRequest } from "../request/loadGarage";
import { LoadGarageResponse } from "../response/loadGarage";
import { Repositories } from "../repo";

export async function loadGarage(
  w: Repositories,
  req: LoadGarageRequest
): Promise<LoadGarageResponse> {
  const profileId = await w.profile().find(req.aimeId, req.version);

  return {
    type: "load_garage_res",
    cars: await w.car().loadCars(profileId, 10, req.fetchOffset),
  };
}
