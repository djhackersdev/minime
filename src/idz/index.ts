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
            field_001A: -1,
            field_001C: new Date(Date.now() + 3600000),
          };

          break;

        case "account_unlock_req":
          res = {
            type: "account_unlock_res",
            status: 1,
          };

          break;

        case "create_profile_req":
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

        case "load_2on2_req":
          res = {
            type: "load_2on2_res",
          };

          break;

        case "load_config_req":
          res = {
            type: "load_config_res",
            status: 1,
          };

          break;

        case "load_config_v2_req":
          res = {
            type: "load_config_v2_res",
            status: 1,
          };

          break;

        case "discover_profile_req":
          res = {
            type: "discover_profile_res",
            result: true,
          };

          break;

        case "load_general_reward_req":
          // A non-generic response is also accepted, but why bother?
          res = {
            type: "generic_res",
            status: 1, // not even checked but let's be consistent
          };

          break;

        case "load_profile_req":
          res = {
            type: "load_record_v2_res",
            name: "てすと",
            profileId: 0x11223344,
            lv: 69,
            fame: 1234,
            dpoint: 54321,
            teamId: 0x22334455,
          };

          break;

        case "load_reward_table_req":
          res = {
            type: "load_reward_table_res",
          };

          break;

        case "load_server_list_req":
          const myHost = hostname();

          res = {
            type: "load_server_list_res",
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

        case "load_stocker_req":
          res = {
            type: "load_stocker_res",
            status: 1,
          };

          break;

        case "load_team_req":
          res = {
            type: "load_team_res",
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

        case "save_expedition_req":
          if (req.field_0004 === 0) {
            res = {
              type: "generic_res",
              status: 0,
            };
          } else {
            res = {
              type: "save_expedition_res",
            };
          }

          break;

        case "update_provisional_store_rank_req":
          res = {
            type: "update_provisional_store_rank_res",
            rows: [],
          };

          break;

        case "save_profile_req":
          res = {
            type: "generic_res",
            status: 1,
          };

          break;

        case "save_settings_req":
          res = {
            type: "generic_res",
            status: 1, // ignored but whatever
          };

          break;

        case "update_story_clear_num_req":
          res = {
            type: "update_story_clear_num_res",
          };

          break;

        case "save_topic_req":
          res = {
            type: "save_topic_res",
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
