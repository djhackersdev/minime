import { Request, Response } from "express";

export default function getGameCharge(req: Request, res: Response) {
  res.json({
    length: 0,
    gameChargeList: [
      /*
      {
        orderId: 1,
        chargeId: 1,
        price: 1,
        startDate: 'STRINGIDK',
        endDate: 'STRINGIDK',
        salePrice:
        saleStartDate: 'STRINGIDK',
        saleEndDate: 'STRINGIDK',
      },
    */
    ],
  });
}
