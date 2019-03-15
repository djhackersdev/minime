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
