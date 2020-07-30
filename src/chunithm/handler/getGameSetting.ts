import { writeDate } from "../proto/base";
import { Repositories } from "../repo";
import { GetGameSettingRequest } from "../request/getGameSetting";
import { GetGameSettingResponse } from "../response/getGameSetting";

export default async function getGameSetting(
  rep: Repositories,
  req: GetGameSettingRequest
): Promise<GetGameSettingResponse> {
  const rebootStartTime = new Date();
  rebootStartTime.setHours(rebootStartTime.getHours() - 3);

  const rebootEndTime = new Date();
  rebootEndTime.setHours(rebootEndTime.getHours() - 2);

  return {
    gameSetting: {
      dataVersion: "1",
      isMaintenance: "false",
      requestInterval: "10",
      rebootStartTime: writeDate(rebootStartTime),
      rebootEndTime: writeDate(rebootEndTime),
      isBackgroundDistribute: "false",
      maxCountCharacter: "300",
      maxCountItem: "300",
      maxCountMusic: "100",
    },
    isDumpUpload: "false",
    isAou: "true",
  };
}
