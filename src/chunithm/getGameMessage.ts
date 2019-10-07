import { Request, Response } from "express";

export default function getGameMessage(req: Request, res: Response) {
  res.json({
    type: 1,
    length: 0,
    gameMessageList: [
      /*    {
        type: 2,
        id: 1,
        message: "true",
        startDate: "0",
        endDate: "0"
      },*/
    ],
  });
}
