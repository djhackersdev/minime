import { Repositories } from "../repo";
import { UpsertClientBookkeepingRequest } from "../request/upsertClientBookkeeping";
import { UpsertClientBookkeepingResponse } from "../response/upsertClientBookkeeping";

export default async function upsertClientBookkeeping(
  rep: Repositories,
  req: UpsertClientBookkeepingRequest
): Promise<UpsertClientBookkeepingResponse> {
  return {
    returnCode: "1",
  };
}
