import { Car } from "../model";
import { LoadGarageRequest } from "../request/loadGarage";
import { LoadGarageResponse } from "../response/loadGarage";
import { World } from "../world";
import { loadJson } from "../world/_util";

export async function loadGarage(
  w: World,
  req: LoadGarageRequest
): Promise<LoadGarageResponse> {
  throw new Error("TODO");
}
