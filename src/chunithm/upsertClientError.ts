import { Request, Response } from "express";

export default function upsertClientError(req: Request, res: Response) {
  res.json({
    returnCode: 1,
    apiName: "UpsertClientErrorApi",
  });
}
