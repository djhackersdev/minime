import { Request, Response } from "express";

export default function getGameEvent(req: Request, res: Response) {
  res.json({
    type: 1,
    length: 0,
    gameEventList: [
      /*
      {
        type: 1,
        id: 1102, // data/A000/event/event00001102
        startDate: 'STRINGIDK',
        endDate: 'STRINGIDK',
      },
    */
    ],
  });
}
