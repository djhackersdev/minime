import logger from "debug";
import { createSocket } from "dgram";

const debug = logger("app:idz:ping");

export default function createPing(port: number, host: string) {
  const socket = createSocket("udp4");

  socket.bind(port, host);
  socket.on("message", (msg, rinfo) => {
    debug("Ping from %s:%s", rinfo.address, rinfo.port);
    socket.send(msg, rinfo.port, rinfo.address);
  });
}
