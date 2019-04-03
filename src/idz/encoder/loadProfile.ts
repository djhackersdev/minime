import { LoadProfileResponse } from "../response/loadProfile";

// Sending this causes an error
export function loadProfile(res: LoadProfileResponse) {
  const buf = Buffer.alloc(0x0c60);

  buf.writeInt16LE(0x0064, 0x0000);

  return buf;
}
