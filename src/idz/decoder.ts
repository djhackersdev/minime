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

readers.set(MSG.CREATE_PROFILE_REQ, buf => {
  return {
    type: "create_profile_req",
    aimeId: buf.readInt32LE(0x0004),
    luid: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
    name: iconv.decode(buf.slice(0x001e, buf.indexOf("\0", 0x001e)), sjis),
    field_0034: buf.readUInt32LE(0x0034),
    field_0040: buf.slice(0x0040, 0x0084),
    car_type: buf.readUInt16LE(0x0084),
    car_color: buf.readUInt16LE(0x0086),
    transmission: buf.readUInt16LE(0x0088) === 0 ? "auto" : "manual",
    field_008A: buf.readUInt16LE(0x008a),
    field_008C: buf.readUInt16LE(0x008c),
    field_0090:
      BigInt(buf.readUInt32LE(0x0090)) |
      (BigInt(buf.readUInt32LE(0x0094)) << 32n),
    field_009C: buf.readUInt16LE(0x009c),
    gender: buf.readUInt16LE(0x00a0) === 0 ? "male" : "female",
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

readers.set(MSG.LOAD_2ON2_REQ, buf => {
  return {
    type: "load_2on2_req",
    field_0002: buf.readUInt16LE(0x0002),
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
  };
});

readers.set(MSG.LOAD_CONFIG_REQ, () => {
  return { type: "load_config_req" };
});

readers.set(MSG.LOAD_CONFIG_V2_REQ, () => {
  return { type: "load_config_v2_req" };
});

readers.set(MSG.DISCOVER_PROFILE_REQ, buf => {
  return {
    type: "discover_profile_req",
    aimeId: buf.readUInt32LE(0x0004),
  };
});

readers.set(MSG.LOAD_GENERAL_REWARD_REQ, buf => {
  return {
    type: "load_general_reward_req",
    field_0004: buf.readUInt32LE(0x0004),
  };
});

readers.set(MSG.LOAD_PROFILE_REQ, buf => {
  return {
    type: "load_profile_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
  };
});

readers.set(MSG.LOAD_STOCKER_REQ, buf => {
  return {
    type: "load_stocker_req",
    field_0004: buf.readUInt32LE(0x0004),
  };
});

readers.set(MSG.LOAD_REWARD_TABLE_REQ, () => {
  return {
    type: "load_reward_table_req",
  };
});

readers.set(MSG.LOAD_SERVER_LIST_REQ, () => {
  return { type: "load_server_list_req" };
});

readers.set(MSG.LOAD_TEAM_REQ, buf => {
  return {
    type: "load_team_req",
    profileId: buf.readUInt32LE(0x0004),
    teamId: buf.readUInt32LE(0x0008),
  };
});

readers.set(MSG.SAVE_EXPEDITION_REQ, buf => {
  return {
    type: "save_expedition_req",
    field_0004: buf.readUInt32LE(0x0004),
  };
});

readers.set(MSG.UPDATE_PROVISIONAL_STORE_RANK_REQ, buf => {
  return {
    type: "update_provisional_store_rank_req",
    aimeId: buf.readUInt32LE(0x0004),
  };
});

readers.set(MSG.SAVE_RECORD_REQ, buf => {
  return {
    type: "save_profile_req",
    // mega TODO
  };
});

readers.set(MSG.SAVE_SETTINGS_REQ, buf => {
  return {
    type: "save_settings_req",
    field_0002: buf.readUInt16LE(0x0002),
    profileId: buf.readUInt32LE(0x0004),
    dpoint: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt32LE(0x000c),
    field_0010: buf.readUInt8(0x0010),
    field_0011: buf.readUInt8(0x0011),
    field_0012: buf.readUInt8(0x0012),
    field_0013: buf.readUInt8(0x0013),
  };
});

readers.set(MSG.UPDATE_STORY_CLEAR_NUM_REQ, () => {
  return {
    type: "update_story_clear_num_req",
  };
});

readers.set(MSG.SAVE_TOPIC_REQ, buf => {
  const aimeId = buf.readUInt32LE(0x0004);

  return {
    type: "save_topic_req",
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
