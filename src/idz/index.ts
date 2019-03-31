import { Socket } from "net";
import { hostname } from "os";

import setup from "./setup";
import { objectExpression } from "@babel/types";

export default async function idz(socket: Socket) {
  const { input, output } = setup(socket);

  console.log("Idz: Connection opened");

  try {
    for await (const msg of input) {
      switch (msg.type) {
        case "account_lock_req":
          output.write({
            type: "account_lock_res",
            field_0018: 1,
            field_001A: 0xffff,
            field_001C: new Date(Date.now() + 3600000),
          });

          break;

        case "account_unlock_req":
          output.write({
            type: "account_unlock_res",
            status: 1,
          });

          break;

        case "create_record_req":
          output.write({
            type: "generic_res",
            status: 1,
          });

          break;

        case "create_team_req":
          output.write({
            type: "create_team_res",
            name: "ＡＳＳ ＧＥＮＴＬＥＭＥＮ",
          });

          break;

        case "get_config_req":
          output.write({
            type: "get_config_res",
            status: 1,
          });

          break;

        case "get_config_2_req":
          output.write({
            type: "get_config_2_res",
            status: 1,
          });

          break;

        case "get_server_list_req":
          const myHost = hostname();

          output.write({
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
          });

          break;

        case "get_exist_record_req":
          output.write({
            type: "get_exist_record_res",
            result: false,
          });

          break;

        case "update_provisional_store_rank_req":
          output.write({
            type: "update_provisional_store_rank_res",
            rows: [10, 11, 12, 13].map(rank => ({
              field_0000: rank,
              field_0004: msg.aimeId + rank - 11,
              field_0010: `x${rank}`,
              field_003B: `y${rank}`,
            })),
          });

          break;

        case "update_record_req":
          output.write({
            type: "generic_res",
            status: 1,
          });

          break;
      }
    }
  } catch (e) {
    console.log("Idz: Error", e);
  }

  console.log("Idz: Connection closed");
}
