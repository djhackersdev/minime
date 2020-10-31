import { CreateProfileResponse } from "../response/createProfile";

export function createProfile1(res: CreateProfileResponse) {
  const buf = Buffer.alloc(0x0020);

  // Shares message type code with the "generic" response
  buf.writeInt16LE(0x0001, 0x0000);
  buf.writeInt32LE(res.aimeId, 0x0004);

  return buf;
}

export function createProfile2(res: CreateProfileResponse) {
  const buf = Buffer.alloc(0x0030);

  buf.writeInt16LE(0x0001, 0x0000);
  buf.writeInt32LE(res.aimeId, 0x0008);

  return buf;
}
