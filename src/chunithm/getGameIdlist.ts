import { Request, Response } from "express";

export default function getGameIdlist(req: Request, res: Response) {
  const { type } = req.body;

  res.json({
    type,
    length: 0,
    gameIdlistList: [],
  });
}
