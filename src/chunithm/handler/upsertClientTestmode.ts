import { Repositories } from "../repo";
import { UpsertClientTestmodeRequest } from "../request/upsertClientTestmode";
import { UpsertClientTestmodeResponse } from "../response/upsertClientTestmode";

export default async function upsertClientTestmode(
  rep: Repositories,
  req: UpsertClientTestmodeRequest
): Promise<UpsertClientTestmodeResponse> {
  return {
    returnCode: "1",
  };
}
