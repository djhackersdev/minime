import { Request, Response } from "express";

export default function getGameSale(req: Request, res: Response) {
  const { type } = req.body;

  res.json({
    type,
    length: 0,
    gameSaleList: [
      /*
      {
        orderId: 1234,
        type,
        id: 4321,
        rate: 5678,
        startDate: 'STRINGIDK',
        endDate: 'STRINGIDK',
      },
    */
    ],
  });
}
