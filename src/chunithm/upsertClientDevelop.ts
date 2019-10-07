import { Request, Response } from "express";

export default function upsertClientDevelop(req: Request, res: Response) {
  res.json({
    returnCode: 1,
    apiName: "UpsertClientDevelopApi",
  });
}
