import {
  Load2on2InfoResponse,
  Load2on2RankingPointsResponse,
} from "../response/load2on2";

export function load2on2RankingPoints1(
  res: Load2on2RankingPointsResponse
): Buffer {
  const buf = Buffer.alloc(0x04c0);

  buf.writeInt16LE(0x00b1, 0x0000);

  return buf;
}

export function load2on2Info1(res: Load2on2InfoResponse): Buffer {
  const buf = Buffer.alloc(0x04c0);

  buf.writeInt16LE(0x0133, 0x0000);

  return buf;
}

export function load2on2RankingPoints2(
  res: Load2on2RankingPointsResponse
): Buffer {
  const buf = Buffer.alloc(0x1290);

  buf.writeInt16LE(0x00a4, 0x0000);

  return buf;
}

export function load2on2Info2(res: Load2on2InfoResponse): Buffer {
  const buf = Buffer.alloc(0x0540);

  buf.writeInt16LE(0x0133, 0x0000);

  return buf;
}
