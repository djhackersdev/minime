import { createSocket } from "dgram";

export default function createPing(port: number) {
  const socket = createSocket("udp4");

  socket.bind(port);
  socket.on("message", (msg, rinfo) => {
    console.log(`Idz Ping: Ping from ${rinfo.address}:${rinfo.port}`);
    socket.send(msg, rinfo.port, rinfo.address);
  });
}
