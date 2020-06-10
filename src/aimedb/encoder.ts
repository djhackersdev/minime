import logger from "debug";
import { Transform } from "stream";

import { AimeResponse, RegisterLevel } from "./response";

const debug = logger("app:aimedb:encoder");

const registerLevels = new Map<RegisterLevel, number>();

registerLevels.set("none", 0);
registerLevels.set("portal", 1);
registerLevels.set("segaid", 2);

function begin(length: number) {
  const buf = Buffer.alloc(length);

  buf.writeUInt16LE(0xa13e, 0x0000); // Magic: aime
  buf.writeUInt16LE(0x3087, 0x0002); // ???
  buf.writeUInt16LE(length, 0x0006);

  return buf;
}

export class Encoder extends Transform {
  constructor() {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
    });
  }

  _transform(msg: AimeResponse, encoding, callback) {
    debug("Encode %j", msg);

    let buf: Buffer;

    switch (msg.type) {
      case "felica_lookup":
        buf = begin(0x0030);
        buf.writeUInt16LE(0x0003, 0x0004); // cmd code
        buf.writeUInt16LE(msg.status, 0x0008);
        buf.write(msg.accessCode, 0x0024, "hex");

        break;

      case "felica_lookup2":
        buf = begin(0x0140);
        buf.writeUInt16LE(0x0012, 0x0004); // cmd code
        buf.writeUInt16LE(msg.status, 0x0008);
        buf.writeInt32LE(msg.aimeId || -1, 0x0020);
        buf.writeUInt32LE(0xffffffff, 0x0024); // FF
        buf.writeUInt32LE(0xffffffff, 0x0028); // FF
        buf.write(msg.accessCode, 0x002c, "hex");
        buf.writeUInt16LE(0x0001, 0x0037); // 00 01

        break;

      case "hello":
        buf = begin(0x0020);
        buf.writeUInt16LE(0x0065, 0x0004); // cmd code
        buf.writeUInt16LE(msg.status, 0x0008);

        break;

      case "campaign":
        // Still figuring this out...

        buf = begin(0x0200);
        buf.writeUInt16LE(0x000c, 0x0004); // cmd code
        buf.writeUInt16LE(msg.status, 0x0008);

        // Campaign array starts at 0x20
        // Element size is 0xA0

        break;

      case "lookup":
        // -1 aime id means card is not registered
        // register level does not seem to matter

        buf = begin(0x0130);
        buf.writeUInt16LE(0x0006, 0x0004); // cmd code
        buf.writeUInt16LE(msg.status, 0x0008);
        buf.writeInt32LE(msg.aimeId || -1, 0x0020);
        buf.writeUInt8(registerLevels[msg.registerLevel], 0x0024);

        break;

      case "lookup2":
        // Seems identical to the above? Just with a different command code.

        buf = begin(0x0130);
        buf.writeUInt16LE(0x0010, 0x0004); // cmd code
        buf.writeUInt16LE(msg.status, 0x0008);
        buf.writeInt32LE(msg.aimeId || -1, 0x0020);
        buf.writeUInt8(registerLevels[msg.registerLevel], 0x0024);

        break;

      case "register":
        // Same response code as v1 lookup command!

        buf = begin(0x0030);
        buf.writeUInt16LE(0x0006, 0x0004); // cmd code
        buf.writeUInt16LE(msg.status, 0x0008);
        buf.writeInt32LE(msg.aimeId, 0x0020);

        break;

      case "log":
        buf = begin(0x0020);
        buf.writeUInt16LE(0x000a, 0x0004); // cmd code
        buf.writeUInt16LE(msg.status, 0x0008);

        break;

      default:
        const exhaust: never = msg;

        return callback(new Error("Unimplemented response type"));
    }

    if (debug.enabled) {
      debug("Send %s", buf.toString("hex"));
    }

    return callback(null, buf);
  }
}
