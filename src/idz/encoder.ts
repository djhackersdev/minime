import iconv = require("iconv-lite");
import { Transform } from "stream";

import { MSG } from "./defs";
import { Response } from "./response";

const sjis = "shift_jis";

export class Encoder extends Transform {
  constructor() {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
    });
  }

  _transform(obj: Response, encoding, callback) {
    console.log("Idz: Res: Object:", obj);

    let buf: Buffer;

    switch (obj.type) {
      case "account_lock_res":
        buf = Buffer.alloc(0x0020);
        buf.writeUInt16LE(MSG.ACCOUNT_LOCK_RES, 0x0000);
        buf.writeUInt8(obj.field_0018, 0x0018);
        buf.writeUInt16LE(obj.field_001A, 0x001a);
        buf.writeUInt32LE(obj.field_001C.getTime() / 1000, 0x001c);

        break;

      case "account_unlock_res":
        buf = Buffer.alloc(0x0010);
        buf.writeUInt16LE(MSG.ACCOUNT_UNLOCK_RES, 0x0000);
        buf.writeUInt8(obj.status, 0x0004);

        break;

      case "create_team_res":
        buf = Buffer.alloc(0x0ca0);
        buf.writeUInt16LE(MSG.CREATE_TEAM_RES, 0x0000);
        iconv.encode(obj.name, sjis).copy(buf, 0x0024);

        break;

      case "generic_res":
        buf = Buffer.alloc(0x0020);
        buf.writeUInt16LE(MSG.GENERIC_RES, 0x0000);
        buf.writeUInt32LE(obj.status, 0x0004);

        break;

      case "get_2on2_res":
        buf = Buffer.alloc(0x04c0);
        buf.writeUInt16LE(MSG.GET_2ON2_RES, 0x0000);

        break;

      case "get_config_res":
        buf = Buffer.alloc(0x01a0);
        buf.writeUInt16LE(MSG.GET_CONFIG_RES, 0x0000);
        buf.writeUInt8(obj.status, 0x0002);

        break;

      case "get_config_2_res":
        buf = Buffer.alloc(0x230);
        buf.writeUInt16LE(MSG.GET_CONFIG_DATA_2_RES, 0x0000);
        buf.writeUInt8(obj.status, 0x0002);

        break;

      case "get_exist_record_res":
        buf = Buffer.alloc(0x0010);
        buf.writeUInt16LE(MSG.GET_EXIST_RECORD_RES, 0x0000);
        buf.writeUInt8(obj.result ? 1 : 0, 0x0004);

        break;

      case "get_general_reward_res":
        // A generic response is acceptable too so why even bother with this..
        buf = Buffer.alloc(0x0330);
        buf.writeUInt16LE(MSG.GET_GENERAL_REWARD_RES, 0x0000);

        break;

      case "get_record_v1_res":
        buf = Buffer.alloc(0x0c60);
        buf.writeUInt16LE(MSG.GET_RECORD_V1_RES, 0x0000);
        //iconv.encode("てすと", sjis).copy(buf, 0x03ea);

        break;

      case "get_record_v2_res":
        buf = Buffer.alloc(0x0d30);
        buf.writeUInt16LE(MSG.GET_RECORD_V2_RES, 0x0000);
        iconv.encode("てすと", sjis).copy(buf, 0x03ee);

        break;

      case "get_reward_table_res":
        buf = Buffer.alloc(0x01c0);
        buf.writeUInt16LE(MSG.GET_REWARD_TABLE_RES, 0x0000);

        break;

      case "get_server_list_res":
        buf = Buffer.alloc(0x04b0);
        buf.writeUInt16LE(MSG.GET_SERVER_LIST_RES, 0x0000);
        buf.writeUInt16LE(obj.status, 0x0002);
        buf.write(obj.userDb.addr, 0x0004);
        buf.writeUInt16LE(obj.userDb.tcp, 0x0084);
        buf.writeUInt16LE(obj.userDb.http, 0x0086);
        buf.write(obj.matchAddr, 0x0088);
        buf.writeUInt16LE(obj.matchPort.tcp, 0x0108);
        buf.writeUInt16LE(obj.matchPort.udpSend, 0x010a);
        buf.writeUInt16LE(obj.matchPort.udpRecv, 0x010c);
        buf.writeUInt16LE(obj.tagMatchPort.tcp, 0x010e);
        buf.writeUInt16LE(obj.tagMatchPort.udpSend, 0x0110);
        buf.writeUInt16LE(obj.tagMatchPort.udpRecv, 0x0112);
        buf.write(obj.event.addr, 0x0114);
        buf.writeUInt16LE(obj.event.tcp, 0x0194);
        buf.write(obj.screenshot.addr, 0x0198);
        buf.writeUInt16LE(obj.screenshot.tcp, 0x0218);
        buf.write(obj.pingReturn, 0x021c);
        buf.write(obj.echo1.addr, 0x029c);
        buf.write(obj.echo2.addr, 0x031c);
        buf.writeUInt16LE(obj.echo1.udp, 0x39c);
        buf.writeUInt16LE(obj.echo2.udp, 0x39e);
        buf.write(obj.newsUrl, 0x03a0);
        buf.write(obj.reportErrorUrl, 0x0424);

        break;

      case "get_stocker_res":
        buf = Buffer.alloc(0x00a0);
        buf.writeUInt16LE(MSG.GET_STOCKER_RES, 0x0000);
        buf.writeUInt8(obj.status, 0x0002);

        break;

      case "get_team_res":
        buf = Buffer.alloc(0x0ca0);
        buf.writeUInt16LE(MSG.GET_TEAM_RES, 0x0000);
        iconv.encode(obj.name, sjis).copy(buf, 0x0024);

        break;

      case "update_provisional_store_rank_res":
        buf = Buffer.alloc(0x02b0);
        buf.writeUInt16LE(MSG.UPDATE_PROVISIONAL_STORE_RANK_RES, 0x0000);

        for (let i = 0; i < 10; i++) {
          const offset = 0x44 + i;
          const row = obj.rows[i];

          if (row !== undefined) {
            buf.writeUInt16LE(row.field_0000, offset + 0x0000);
            buf.writeUInt32LE(row.field_0004, offset + 0x0004);
            iconv.encode(row.field_0010, sjis).copy(buf, offset + 0x0010);
            iconv.encode(row.field_003B, sjis).copy(buf, offset + 0x003b);
          }
        }

        break;

      case "update_story_clear_num_res":
        buf = Buffer.alloc(0x0220);
        buf.writeUInt16LE(MSG.UPDATE_STORY_CLEAR_NUM_RES, 0x0000);

        break;

      case "update_topic_res":
        buf = Buffer.alloc(0x05d0);
        buf.writeUInt16LE(MSG.UPDATE_TOPIC_RES, 0x0000);

        break;

      default:
        const exhaustCheck: never = obj;

        return callback(new Error(`No writer fn for ${obj["type"]}`));
    }

    console.log("Idz: Res: Encoded:", buf.toString("hex"));

    if (buf.readInt16LE(0) === 0) {
      throw new Error("MESSAGE TYPE CODE YOU FUCKING IDIOT");
    }

    return callback(null, buf);
  }
}
