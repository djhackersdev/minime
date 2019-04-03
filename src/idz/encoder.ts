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
        buf.writeInt16LE(MSG.ACCOUNT_LOCK_RES, 0x0000);
        buf.writeInt8(obj.field_0018, 0x0018);
        buf.writeInt16LE(obj.field_001A, 0x001a);
        buf.writeInt32LE(obj.field_001C.getTime() / 1000, 0x001c);

        break;

      case "account_unlock_res":
        buf = Buffer.alloc(0x0010);
        buf.writeInt16LE(MSG.ACCOUNT_UNLOCK_RES, 0x0000);
        buf.writeInt8(obj.status, 0x0004);

        break;

      case "create_team_res":
      case "load_team_res":
        buf = Buffer.alloc(0x0ca0);
        iconv.encode(obj.name, sjis).copy(buf, 0x0024);

        for (let i = 0; i < 6; i++) {
          const base = 0x011c + i * 0x004c;
          const member = obj.members[i];

          if (member === undefined) {
            break;
          }

          buf.writeInt32LE(1, base + 0x0000); // Presence
          iconv.encode(member.name + "\0", sjis).copy(buf, base + 0x0004);
          buf.writeInt32LE(member.lv, base + 0x0018);
          buf.writeInt32LE(member.monthPoints, base + 0x0024);
        }

        // xM

        /*
        buf.writeInt16LE(0x00001, 0x0344 + 0x0000);
        buf.writeInt8(0x02, 0x0344 + 0x0003);
        buf.writeInt32LE(0x00000003, 0x0344 + 0x0004);
        iconv.encode("str\0", sjis).copy(buf, 0x0344 + 0x0008);
        buf.writeInt32LE(0x00000004, 0x0344 + 0x001c);
        */

        if (obj.type === "create_team_res") {
          buf.writeInt16LE(MSG.CREATE_TEAM_RES, 0x0000);
        } else {
          buf.writeInt16LE(MSG.LOAD_TEAM_RES, 0x0000);
        }

        break;

      case "generic_res":
        buf = Buffer.alloc(0x0020);
        buf.writeInt16LE(MSG.GENERIC_RES, 0x0000);
        buf.writeInt32LE(obj.status, 0x0004);

        break;

      case "load_2on2_res":
        buf = Buffer.alloc(0x04c0);
        buf.writeInt16LE(MSG.LOAD_2ON2_RES, 0x0000);

        break;

      case "load_config_res":
        buf = Buffer.alloc(0x01a0);
        buf.writeInt16LE(MSG.LOAD_CONFIG_RES, 0x0000);
        buf.writeInt8(obj.status, 0x0002);

        break;

      case "load_config_v2_res":
        buf = Buffer.alloc(0x230);
        buf.writeInt16LE(MSG.LOAD_CONFIG_V2_RES, 0x0000);
        buf.writeInt8(obj.status, 0x0002);

        break;

      case "discover_profile_res":
        buf = Buffer.alloc(0x0010);
        buf.writeInt16LE(MSG.DISCOVER_PROFILE_RES, 0x0000);
        buf.writeInt8(obj.result ? 1 : 0, 0x0004);

        break;

      case "load_general_reward_res":
        // A generic response is acceptable too so why even bother with this..
        buf = Buffer.alloc(0x0330);
        buf.writeInt16LE(MSG.LOAD_GENERAL_REWARD_RES, 0x0000);

        break;

      case "load_record_v1_res":
        // Sending this causes an error
        buf = Buffer.alloc(0x0c60);
        buf.writeInt16LE(MSG.LOAD_PROFILE_V1_RES, 0x0000);

        break;

      case "load_record_v2_res":
        buf = Buffer.alloc(0x0d30);

        buf.writeInt16LE(MSG.LOAD_PROFILE_V2_RES, 0x0000);
        buf.writeInt32LE(obj.profileId, 4 + 0x3b4);
        buf.writeInt16LE(obj.lv, 4 + 0x03c8);
        buf.writeInt32LE(obj.dpoint, 4 + 0x03e4);
        buf.writeInt32LE(obj.fame, 4 + 0x0400);
        iconv.encode(obj.name + "\0", sjis).copy(buf, 4 + 0x03ea);
        buf.writeInt32LE(obj.teamId, 0x07e0);

        break;

      case "load_reward_table_res":
        buf = Buffer.alloc(0x01c0);
        buf.writeInt16LE(MSG.LOAD_REWARD_TABLE_RES, 0x0000);

        break;

      case "load_server_list_res":
        buf = Buffer.alloc(0x04b0);
        buf.writeInt16LE(MSG.LOAD_SERVER_LIST_RES, 0x0000);
        buf.writeInt16LE(obj.status, 0x0002);
        buf.write(obj.userDb.addr, 0x0004);
        buf.writeInt16LE(obj.userDb.tcp, 0x0084);
        buf.writeInt16LE(obj.userDb.http, 0x0086);
        buf.write(obj.matchAddr, 0x0088);
        buf.writeInt16LE(obj.matchPort.tcp, 0x0108);
        buf.writeInt16LE(obj.matchPort.udpSend, 0x010a);
        buf.writeInt16LE(obj.matchPort.udpRecv, 0x010c);
        buf.writeInt16LE(obj.tagMatchPort.tcp, 0x010e);
        buf.writeInt16LE(obj.tagMatchPort.udpSend, 0x0110);
        buf.writeInt16LE(obj.tagMatchPort.udpRecv, 0x0112);
        buf.write(obj.event.addr, 0x0114);
        buf.writeInt16LE(obj.event.tcp, 0x0194);
        buf.write(obj.screenshot.addr, 0x0198);
        buf.writeInt16LE(obj.screenshot.tcp, 0x0218);
        buf.write(obj.pingReturn, 0x021c);
        buf.write(obj.echo1.addr, 0x029c);
        buf.write(obj.echo2.addr, 0x031c);
        buf.writeInt16LE(obj.echo1.udp, 0x39c);
        buf.writeInt16LE(obj.echo2.udp, 0x39e);
        buf.write(obj.newsUrl, 0x03a0);
        buf.write(obj.reportErrorUrl, 0x0424);

        break;

      case "load_stocker_res":
        buf = Buffer.alloc(0x00a0);
        buf.writeInt16LE(MSG.LOAD_STOCKER_RES, 0x0000);
        buf.writeInt8(obj.status, 0x0002);

        break;

      case "save_expedition_res":
        buf = Buffer.alloc(0x17c0);
        buf.writeInt16LE(MSG.SAVE_EXPEDITION_RES, 0x0000);
        // in awe of the size of this lad

        break;

      case "update_provisional_store_rank_res":
        buf = Buffer.alloc(0x02b0);
        buf.writeInt16LE(MSG.UPDATE_PROVISIONAL_STORE_RANK_RES, 0x0000);

        for (let i = 0; i < 10; i++) {
          const offset = 0x44 + i;
          const row = obj.rows[i];

          if (row !== undefined) {
            buf.writeInt16LE(row.field_0000, offset + 0x0000);
            buf.writeInt32LE(row.field_0004, offset + 0x0004);
            iconv.encode(row.field_0010, sjis).copy(buf, offset + 0x0010);
            iconv.encode(row.field_003B, sjis).copy(buf, offset + 0x003b);
          }
        }

        break;

      case "update_story_clear_num_res":
        buf = Buffer.alloc(0x0220);
        buf.writeInt16LE(MSG.UPDATE_STORY_CLEAR_NUM_RES, 0x0000);

        break;

      case "save_topic_res":
        buf = Buffer.alloc(0x05d0);
        buf.writeInt16LE(MSG.SAVE_TOPIC_RES, 0x0000);

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
