import { Request, Response } from "express";

export default function getGameSetting(req: Request, res: Response) {
  res.json({
    returnCode: 1,
    apiName: "UpsertClientSettingApi",
  });
}
