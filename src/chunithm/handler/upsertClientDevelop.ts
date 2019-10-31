import { Repositories } from "../repo";
import { UpsertClientDevelopRequest } from "../request/upsertClientDevelop";
import { UpsertClientDevelopResponse } from "../response/upsertClientDevelop";

export default async function upsertClientDevelop(
  rep: Repositories,
  req: UpsertClientDevelopRequest
): Promise<UpsertClientDevelopResponse> {
  return {
    returnCode: "1",
  };
}
