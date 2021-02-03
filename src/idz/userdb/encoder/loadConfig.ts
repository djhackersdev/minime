import {
  LoadConfigResponseA,
  LoadConfigResponseB,
} from "../response/loadConfig";

export function loadConfigA_1(res: LoadConfigResponseA) {
  const buf = Buffer.alloc(0x01a0);

  buf.writeInt16LE(0x0005, 0x0000);
  buf.writeInt8(res.status, 0x0002);
  buf.writeUInt16LE(res.serverVersion, 0x0016);

  return buf;
}

export function loadConfigB_1(res: LoadConfigResponseB) {
  const buf = Buffer.alloc(0x0230);

  buf.writeInt16LE(0x00ac, 0x0000);
  buf.writeInt8(res.status, 0x0002);

  return buf;
}

export function loadConfigA_2(res: LoadConfigResponseA) {
  const buf = Buffer.alloc(0x05e0);

  buf.writeInt16LE(0x0005, 0x0000);
  buf.writeInt8(res.status, 0x0002);
  buf.writeUInt16LE(res.serverVersion, 0x0016);

  return buf;
}

export function loadConfigB_2(res: LoadConfigResponseB) {
  const buf = Buffer.alloc(0x0240);

  buf.writeInt16LE(0x00a1, 0x0000);
  buf.writeInt8(res.status, 0x0002);

  return buf;
}
