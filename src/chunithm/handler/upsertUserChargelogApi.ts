import { Repositories } from "../repo";
import { UpsertUserChargelogApiRequest } from "../request/upsertUserChargelogApi";
import { UpsertUserChargelogApiResponse } from "../response/upsertUserChargelogApi";

export default async function UpsertUserChargelogApi(
  rep: Repositories,
  req: UpsertUserChargelogApiRequest
): Promise<UpsertUserChargelogApiResponse> {
  return {
    returnCode: "1",
  };
}