import { CreateTeamResponse } from "../response/createTeam";

export function createTeam1(res: CreateTeamResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x0072, 0x0000);
  buf.writeUInt32LE(res.status, 0x0004);
  buf.writeUInt32LE(res.teamExtId, 0x0008);

  return buf;
}

export function createTeam2(res: CreateTeamResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x006e, 0x0000);
  buf.writeUInt32LE(res.status, 0x0004);
  buf.writeUInt32LE(res.teamExtId, 0x0008);

  return buf;
}
