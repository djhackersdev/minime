import { UpdateTeamLeaderResponse } from "../response/updateTeamLeader";

export function updateTeamLeader(res: UpdateTeamLeaderResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x008b, 0x0000);
  buf.writeUInt32LE(res.status, 0x0004);

  return buf;
}
