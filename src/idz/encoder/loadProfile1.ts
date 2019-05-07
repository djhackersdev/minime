import { LoadProfileResponse1 } from "../response/loadProfile";

// Sending this causes an error in v1.21, so it is currently unmapped and
// unimplemented.

export function loadProfile1(res: LoadProfileResponse1) {
  const buf = Buffer.alloc(0x0c60);

  buf.writeInt16LE(0x0064, 0x0000);

  return buf;
}
