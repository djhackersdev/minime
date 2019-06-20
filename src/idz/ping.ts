import { createSocket } from "dgram";

export default function createPing(port: number, host: string) {
  const socket = createSocket("udp4");

  socket.bind(port, host);
  socket.on("message", (msg, rinfo) => {
    console.log(`Idz Ping: Ping from ${rinfo.address}:${rinfo.port}`);
    socket.send(msg, rinfo.port, rinfo.address);
  });
}
