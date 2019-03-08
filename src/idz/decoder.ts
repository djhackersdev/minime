import { Transform } from "stream";

import { MSG, MSG_LEN } from "./defs";

const readers = new Map();

function readHeader(buf) {
  return {
    blah: "blah",
  };
}

readers.set(MSG.GET_CONFIG_DATA_REQ, buf => {
  return { type: "get_config_data_req" };
});

readers.set(MSG.GET_CONFIG_DATA_2_REQ, buf => {
  return { type: "get_config_data_2_req" };
});

readers.set(MSG.GET_SERVER_LIST_REQ, buf => {
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

  _transform(chunk, encoding, callback) {
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
    const reader = readers.get(msgCode);

    if (msgLen === undefined || reader === undefined) {
      return callback(
        new Error(
          `Unknown command code ${msgCode.toString(16)}, cannot continue`
        )
      );
    }

    if (this.state.length < 0x30 + msgLen) {
      return callback(null);
    }

    const reqBuf = this.state.slice(0x30, 0x30 + msgLen);
    const payload = reader(reqBuf);

    console.log("Idz: RAW:", reqBuf.toString("hex"));
    console.log("Idz: Header:", header);
    console.log("Idz: Payload:", payload);

    return callback(null, { header, payload });
  }
}
