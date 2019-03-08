import { hostname } from "os";

import setup from "./setup";

export default async function idz(socket) {
  const { input, output } = setup(socket);

  console.log("Idz: Connection opened");

  try {
    for await (const msg of input) {
      switch (msg.payload.type) {
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

        case "get_config_data_req":
          output.write({
            type: "get_config_data_res",
            status: 1,
          });

          break;

        case "get_config_data_2_req":
          output.write({
            type: "get_config_data_2_res",
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
