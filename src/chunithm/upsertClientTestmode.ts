import { Request, Response } from "express";

export default function upsertClientTestmode(req: Request, res: Response) {
  res.json({
    returnCode: 1,
    apiName: "UpsertClientTestmodeApi",
  });
}
