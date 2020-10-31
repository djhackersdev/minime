import { LoadTeamRankingResponse } from "../response/loadTeamRanking";

export function loadTeamRanking1(res: LoadTeamRankingResponse): Buffer {
  const buf = Buffer.alloc(0x0ba0);

  buf.writeUInt16LE(0x00ba, 0x0000);
  // Row stride is 0x94

  return buf;
}

export function loadTeamRanking2(res: LoadTeamRankingResponse): Buffer {
  const buf = Buffer.alloc(0x0ba0);

  buf.writeUInt16LE(0x00a8, 0x0000);

  return buf;
}
