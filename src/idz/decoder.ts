import { Transform } from "stream";

import { MSG, MSG_LEN } from "./defs";
import { Request } from "./request";

type ReaderFn = (buf: Buffer) => Request;

const readers = new Map<number, ReaderFn>();

function readHeader(buf: Buffer) {
  return {
    blah: "blah",
  };
}

readers.set(MSG.ACCOUNT_LOCK_REQ, buf => {
  return {
    type: "account_lock_req",
    aimeId: buf.readInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
    field_0018: buf.readInt16LE(0x0018),
  };
});

readers.set(MSG.GET_CONFIG_DATA_REQ, () => {
  return { type: "get_config_data_req" };
});

readers.set(MSG.GET_CONFIG_DATA_2_REQ, () => {
  return { type: "get_config_data_2_req" };
});

readers.set(MSG.GET_SERVER_LIST_REQ, () => {
  return { type: "get_server_list_req" };
});

export class Decoder extends Transform {
  state: Buffer;

  constructor() {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
    });

    this.state = Buffer.alloc(0);
  }

  _transform(chunk: Buffer, encoding, callback) {
    this.state = Buffer.concat([this.state, chunk]);

    // Read header

    if (this.state.length < 0x04) {
      return callback(null);
    }

    const magic = this.state.readUInt32LE(0);

    if (magic !== 0x01020304) {
      return callback(
        new Error(
          "Invalid magic number, cryptographic processing probably incorrect."
        )
      );
    }

    if (this.state.length < 0x30) {
      return callback(null);
    }

    const header = readHeader(this.state);

    if (this.state.length < 0x32) {
      return callback(null);
    }

    const msgCode = this.state.readUInt16LE(0x30);
    const msgLen = MSG_LEN.get(msgCode);

    if (msgLen === undefined) {
      return callback(
        new Error(
          `Unknown command code ${msgCode.toString(16)}, cannot continue`
        )
      );
    }

    if (this.state.length < 0x30 + msgLen) {
      return callback(null);
    }

    const reqBuf = this.state.slice(0, 0x30 + msgLen);
    const payloadBuf = reqBuf.slice(0x30);

    console.log("Idz: Req: Raw:", reqBuf.toString("hex"));
    console.log("Idz: Req: Header:", header);

    const reader = readers.get(msgCode);

    if (reader === undefined) {
      return callback(
        new Error(`No reader for command code ${msgCode.toString(16)}`)
      );
    }

    const payload = reader(payloadBuf);

    console.log("Idz: Req: Payload:", payload);

    return callback(null, payload);
  }
}
