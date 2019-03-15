import { Transform } from "stream";

const registerLevels = {
  none: 0,
  portal: 1,
  segaid: 2,
};

export class Encoder extends Transform {
  constructor(options) {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
      ...options,
    });
  }

  static init(length) {
    const buf = Buffer.alloc(length);

    buf.writeUInt16LE(0xa13e, 0x0000); // Magic?
    buf.writeUInt16LE(0x3087, 0x0002); // ???
    buf.writeUInt16LE(length, 0x0006);

    return buf;
  }

  _transform(chunk, encoding, callback) {
    console.log("Aimedb: Encode", chunk);

    let buf;

    switch (chunk.cmd) {
      case "hello":
        buf = Encoder.init(0x0020);
        buf.writeUInt16LE(0x0065, 0x0004); // cmd code
        buf.writeUInt16LE(chunk.status, 0x0008);

        break;

      case "campaign":
        // Still figuring this out...

        buf = Encoder.init(0x0200);
        buf.writeUInt16LE(0x000c, 0x0004); // cmd code
        buf.writeUInt16LE(chunk.status, 0x0008);

        // Campaign array starts at 0x20
        // Element size is 0xA0

        break;

      case "lookup":
        // -1 aime id means card is not registered
        // register level does not seem to matter

        buf = Encoder.init(0x0130);
        buf.writeUInt16LE(0x0010, 0x0004); // cmd code
        buf.writeUInt16LE(chunk.status, 0x0008);
        buf.writeInt32LE(chunk.aimeId || -1, 0x0020);
        buf.writeUInt8(registerLevels[chunk.registerLevel], 0x0024);

        break;

      case "register":
        buf = Encoder.init(0x0030);
        buf.writeUInt16LE(0x0006, 0x0004); // cmd code
        buf.writeUInt16LE(chunk.status, 0x0008);
        buf.writeInt32LE(chunk.aimeId, 0x0020);

        break;

      case "log":
        buf = Encoder.init(0x0020);
        buf.writeUInt16LE(0x000a, 0x0004); // cmd code
        buf.writeUInt16LE(chunk.status, 0x0008);

        break;

      default:
        return callback(new Error(`Unimplemented response: ${chunk.cmd}`));
    }

    console.log("Aimedb: Send", buf);

    return callback(null, buf);
  }
}
