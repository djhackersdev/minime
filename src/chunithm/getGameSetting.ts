import { Request, Response } from "express";

export default function getGameSetting(req: Request, res: Response) {
  res.json({
    gameSetting: {
      dataVersion: 1,
      isMaintenance: false,
      requestInterval: 10,
      rebootStartTime: 0,
      rebootEndTime: 0,
      isBackgroundDistribute: false,
      maxCountCharacter: 999,
      maxCountItem: 999,
      maxCountMusic: 999,
    },
    isDumpUpload: false,
    isAou: false,
  });
}
