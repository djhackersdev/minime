import { LoadConfigResponse2 } from "../response/loadConfig2";

export function loadConfig2(res: LoadConfigResponse2) {
  const buf = Buffer.alloc(0x0230);

  buf.writeInt16LE(0x00ac, 0x0000);
  buf.writeInt8(res.status, 0x0002);

  return buf;
}
