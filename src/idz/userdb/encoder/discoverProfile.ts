import { DiscoverProfileResponse } from "../response/discoverProfile";

export function discoverProfile1(res: DiscoverProfileResponse) {
  const buf = Buffer.alloc(0x0010);

  buf.writeInt16LE(0x006c, 0x0000);
  buf.writeInt8(res.exists ? 1 : 0, 0x0004);

  return buf;
}

export function discoverProfile2(res: DiscoverProfileResponse) {
  const buf = Buffer.alloc(0x0010);

  buf.writeInt16LE(0x0068, 0x0000);
  buf.writeInt8(res.exists ? 1 : 0, 0x0004);

  return buf;
}
