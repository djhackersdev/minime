import { Request, Response } from "express";

export default function upsertClientBookkeeping(req: Request, res: Response) {
  res.json({
    returnCode: 1,
    apiName: "UpsertClientBookkeepingApi",
  });
}
