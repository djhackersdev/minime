import { Socket } from "net";
import { hostname } from "os";

import setup from "./setup";
import { Response } from "./response";

export default async function idz(socket: Socket) {
  const { input, output } = setup(socket);

  console.log("Idz: Connection opened");

  try {
    for await (const req of input) {
      let res: Response;

      switch (req.type) {
        case "account_lock_req":
          res = {
            type: "account_lock_res",
            field_0018: 1,
            field_001A: 0xffff,
            field_001C: new Date(Date.now() + 3600000),
          };

          break;

        case "account_unlock_req":
          res = {
            type: "account_unlock_res",
            status: 1,
          };

          break;

        case "create_record_req":
          res = {
            type: "generic_res",
            status: 1,
          };

          break;

        case "create_team_req":
          res = {
            type: "create_team_res",
            name: "ＡＳＳ ＧＥＮＴＬＥＭＥＮ",
            members: [],
          };

          break;

        case "get_2on2_req":
          res = {
            type: "get_2on2_res",
          };

          break;

        case "get_config_req":
          res = {
            type: "get_config_res",
            status: 1,
          };

          break;

        case "get_config_2_req":
          res = {
            type: "get_config_2_res",
            status: 1,
          };

          break;

        case "get_exist_record_req":
          res = {
            type: "get_exist_record_res",
            result: true,
          };

          break;

        case "get_general_reward_req":
          // A non-generic response is also accepted, but why bother?
          res = {
            type: "generic_res",
            status: 1, // not even checked but let's be consistent
          };

          break;

        case "get_record_req":
          res = {
            type: "get_record_v2_res",
            name: "てすと",
            teamId: 0x11223344,
            lv: 69,
            fame: 1234,
            dpoint: 54321,
          };

          break;

        case "get_reward_table_req":
          res = {
            type: "get_reward_table_res",
          };

          break;

        case "get_server_list_req":
          const myHost = hostname();

          res = {
            type: "get_server_list_res",
            status: 1,
            userDb: {
              addr: myHost,
              tcp: 10000,
              http: 10001,
            },
            matchAddr: myHost,
            matchPort: {
              tcp: 10002,
              udpSend: 10003,
              udpRecv: 10004,
            },
            tagMatchPort: {
              tcp: 10005,
              udpSend: 10006,
              udpRecv: 10007,
            },
            event: {
              addr: myHost,
              tcp: 10008,
            },
            screenshot: {
              addr: myHost,
              tcp: 10009,
            },
            pingReturn: myHost,
            echo1: {
              addr: myHost,
              udp: 10010,
            },
            echo2: {
              addr: myHost,
              udp: 10011,
            },
            newsUrl: `http://${myHost}:10012/news`,
            reportErrorUrl: `http://${myHost}:10013/error`,
          };

          break;

        case "get_stocker_req":
          res = {
            type: "get_stocker_res",
            status: 1,
          };

          break;

        case "get_team_req":
          res = {
            type: "get_team_res",
            name: "ＡＳＳ ＧＥＮＴＬＥＭＥＮ",
            members: [
              {
                name: "てすと",
                lv: 69,
                monthPoints: 1234,
              },
            ],
          };

          break;

        case "update_expedition_req":
          if (req.field_0004 === 0) {
            res = {
              type: "generic_res",
              status: 0,
            };
          } else {
            res = {
              type: "update_expedition_res",
            };
          }

          break;

        case "update_provisional_store_rank_req":
          res = {
            type: "update_provisional_store_rank_res",
            rows: [],
          };

          break;

        case "update_record_req":
          res = {
            type: "generic_res",
            status: 1,
          };

          break;

        case "update_story_clear_num_req":
          res = {
            type: "update_story_clear_num_res",
          };

          break;

        case "update_topic_req":
          res = {
            type: "update_topic_res",
          };

          break;

        default:
          const exhaustCheck: never = req;

          throw new Error(`Unhandled message ${req["type"]}`);
      }

      output.write(res);
    }
  } catch (e) {
    console.log("Idz: Error", e);
  }

  console.log("Idz: Connection closed");
}
