import { Request, Response } from "express";

export default function getGameRanking(req: Request, res: Response) {
  const { type } = req.body;

  res.json({
    type,
    gameRankingList: [
      /*
      // QWORD fields maybe?
      {
        id: 1,
        point: 1,
      }
    */
    ],
  });
}
