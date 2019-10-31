import { Repositories } from "../repo";
import { UpsertClientErrorRequest } from "../request/upsertClientError";
import { UpsertClientErrorResponse } from "../response/upsertClientError";

export default async function upsertClientError(
  rep: Repositories,
  req: UpsertClientErrorRequest
): Promise<UpsertClientErrorResponse> {
  return {
    returnCode: "1",
  };
}
