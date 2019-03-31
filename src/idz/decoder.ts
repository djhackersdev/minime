import iconv = require("iconv-lite");
import { Transform } from "stream";

import { MSG, REQ_LEN } from "./defs";
import { Request } from "./request";

type ReaderFn = (buf: Buffer) => Request;

const sjis = "shift_jis";
const readers = new Map<number, ReaderFn>();

function readHeader(buf: Buffer) {
  return {
    blah: "blah",
  };
}

readers.set(MSG.ACCOUNT_LOCK_REQ, buf => {
  return {
    type: "account_lock_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
    field_0018: buf.readUInt16LE(0x0018),
  };
});

readers.set(MSG.ACCOUNT_UNLOCK_REQ, buf => {
  return {
    type: "account_unlock_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
  };
});

readers.set(MSG.CREATE_RECORD_REQ, buf => {
  return {
    type: "create_record_req",
    aimeId: buf.readInt32LE(0x0004),
    luid: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
    name: iconv.decode(buf.slice(0x001e, buf.indexOf("\0", 0x001e)), sjis),
    field_0034: buf.readUInt32LE(0x0034),
    field_0040: buf.slice(0x0040, 0x0084),
    field_0084: buf.readUInt16LE(0x0084),
    field_0086: buf.readUInt16LE(0x0086),
    field_0088: buf.readUInt16LE(0x0088),
    field_008A: buf.readUInt16LE(0x008a),
    field_008C: buf.readUInt16LE(0x008c),
    field_0090:
      BigInt(buf.readUInt32LE(0x0090)) |
      (BigInt(buf.readUInt32LE(0x0094)) << 32n),
    field_009C: buf.readUInt16LE(0x009c),
    field_00A0: buf.readUInt16LE(0x00a0),
    field_00A2: buf.readUInt16LE(0x00a2),
    field_00A4: buf.readUInt16LE(0x00a4),
    field_00A6: buf.readUInt16LE(0x00a6),
    field_00A8: buf.readUInt16LE(0x00a8),
    field_00AA: buf.readUInt16LE(0x00aa),
    field_00AC: buf.readUInt16LE(0x00ac),
    field_00AE: buf.readUInt16LE(0x00ae),
    field_00B0: buf.readUInt16LE(0x00b0),
    field_00B2: buf.readUInt8(0x00b2),
  };
});

readers.set(MSG.CREATE_TEAM_REQ, buf => {
  return {
    type: "create_team_req",
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt8(0x000c),
  };
});

readers.set(MSG.GET_2ON2_REQ, buf => {
  return {
    type: "get_2on2_req",
    field_0002: buf.readUInt16LE(0x0002),
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
  };
});

readers.set(MSG.GET_CONFIG_REQ, () => {
  return { type: "get_config_req" };
});

readers.set(MSG.GET_CONFIG_DATA_2_REQ, () => {
  return { type: "get_config_2_req" };
});

readers.set(MSG.GET_EXIST_RECORD_REQ, buf => {
  return {
    type: "get_exist_record_req",
    aimeId: buf.readUInt32LE(0x0004),
  };
});

readers.set(MSG.GET_GENERAL_REWARD_REQ, buf => {
  return {
    type: "get_general_reward_req",
    field_0004: buf.readUInt32LE(0x0004),
  };
});

readers.set(MSG.GET_RECORD_REQ, buf => {
  return {
    type: "get_record_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
  };
});

readers.set(MSG.GET_STOCKER_REQ, buf => {
  return {
    type: "get_stocker_req",
    aimeId: buf.readUInt32LE(0x0004),
  };
});

readers.set(MSG.GET_REWARD_TABLE_REQ, () => {
  return {
    type: "get_reward_table_req",
  };
});

readers.set(MSG.GET_SERVER_LIST_REQ, () => {
  return { type: "get_server_list_req" };
});

readers.set(MSG.GET_TEAM_REQ, buf => {
  return {
    type: "get_team_req",
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
  };
});

readers.set(MSG.UPDATE_PROVISIONAL_STORE_RANK_REQ, buf => {
  return {
    type: "update_provisional_store_rank_req",
    aimeId: buf.readUInt32LE(0x0004),
  };
});

readers.set(MSG.UPDATE_RECORD_REQ, buf => {
  return {
    type: "update_record_req",
    // mega TODO
  };
});

readers.set(MSG.UPDATE_STORY_CLEAR_NUM_REQ, () => {
  return {
    type: "update_story_clear_num_req",
  };
});

readers.set(MSG.UPDATE_TOPIC_REQ, buf => {
  const aimeId = buf.readUInt32LE(0x0004);

  return {
    type: "update_topic_req",
    aimeId: aimeId !== 0xffffffff ? aimeId : undefined,
  };
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
    const msgLen = REQ_LEN.get(msgCode);

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
