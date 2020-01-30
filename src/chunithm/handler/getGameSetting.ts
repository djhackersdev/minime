import { Repositories } from "../repo";
import { GetGameSettingRequest } from "../request/getGameSetting";
import { GetGameSettingResponse } from "../response/getGameSetting";

export default async function getGameSetting(
  rep: Repositories,
  req: GetGameSettingRequest
): Promise<GetGameSettingResponse> {
  return {
    gameSetting: {
      dataVersion: "1",
      isMaintenance: "false",
      requestInterval: "10",
      rebootStartTime: "0",
      rebootEndTime: "0",
      isBackgroundDistribute: "false",
      maxCountCharacter: "300",
      maxCountItem: "300",
      maxCountMusic: "300",
    },
    isDumpUpload: "false",
    isAou: "false",
  };
}
