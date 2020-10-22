import { LoadConfigResponse } from "../response/loadConfig";

export function loadConfig1(res: LoadConfigResponse) {
  const buf = Buffer.alloc(0x01a0);

  buf.writeInt16LE(0x0005, 0x0000);
  buf.writeInt8(res.status, 0x0002);
  buf.writeUInt16LE(res.serverVersion, 0x0016);

  return buf;
}

export function loadConfig2(res: LoadConfigResponse) {
  const buf = Buffer.alloc(0x0230);

  buf.writeInt16LE(0x00ac, 0x0000);
  buf.writeInt8(res.status, 0x0002);

  return buf;
}
