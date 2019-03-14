import { Transform } from "stream";

export class Decoder extends Transform {
  constructor(options) {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
      ...options,
    });
  }

  static ident(chunk) {
    const gameId = chunk.toString("ascii", 0x000a, 0x000e);
    const keychipId = chunk.toString("ascii", 0x0014, 0x001f);

    return { gameId, keychipId };
  }

  static cardId(chunk) {
    const luid = chunk.slice(0x0020, 0x002a);

    return { luid, ...Decoder.ident(chunk) };
  }

  static log(chunk) {
    // idk what any of this stuff means yet
    // field20 and field28 appear to be an aime id but that is all.

    const field20 = chunk.readUInt32LE(0x20);
    const field24 = chunk.readUInt32LE(0x24);
    const field28 = chunk.readUInt32LE(0x28);
    const field2C = chunk.readUInt32LE(0x2c);
    const field30 = chunk.readUInt32LE(0x30);
    const field34 = chunk.readUInt32LE(0x34);
    const field38 = chunk.readUInt32LE(0x38);
    const field3C = chunk.readUInt32LE(0x3c);

    return {
      field20,
      field24,
      field28,
      field2C,
      field30,
      field34,
      field38,
      field3C,
      ...Decoder.ident(chunk),
    };
  }

  _transform(chunk, encoding, callback) {
    const cmd = chunk.readUInt16LE(0x04);

    switch (cmd) {
      case 0x0005:
        return callback(null, {
          cmd: "register",
          ...Decoder.cardId(chunk),
        });

      case 0x0009:
        return callback(null, {
          cmd: "log",
          ...Decoder.log(chunk),
        });

      case 0x000b:
        return callback(null, {
          cmd: "campaign",
          ...Decoder.ident(chunk),
        });

      case 0x000f:
        return callback(null, {
          cmd: "lookup",
          ...Decoder.cardId(chunk),
        });

      case 0x0064:
        return callback(null, {
          cmd: "hello",
          ...Decoder.ident(chunk),
        });

      case 0x0066:
        return callback(null, {
          cmd: "goodbye",
        });

      default:
        return callback(null, {
          cmd: `unknown_${cmd}`,
        });
    }
  }
}

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
