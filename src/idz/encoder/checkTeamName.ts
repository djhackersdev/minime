import { CheckTeamNameResponse } from "../response/checkTeamName";

export function checkTeamName(res: CheckTeamNameResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x00a3, 0x0000);
  buf.writeUInt32LE(res.status, 0x0004);

  return buf;
}
