import { Repositories } from "../repo";
import { UpsertClientSettingRequest } from "../request/upsertClientSetting";
import { UpsertClientSettingResponse } from "../response/upsertClientSetting";

export default async function upsertClientSetting(
  rep: Repositories,
  req: UpsertClientSettingRequest
): Promise<UpsertClientSettingResponse> {
  return {
    returnCode: "1",
  };
}
