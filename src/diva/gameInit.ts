import { Request, Response } from "express";

export default function gameInit(req: Request, res: Response) {
  const { cmd, req_id } = req.body;

  res.send({
    cmd,
    req_id,
    stat: 1,
  });
}
