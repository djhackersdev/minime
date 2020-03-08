import { LoadServerListResponse } from "../response/loadServerList";

export function loadServerList(res: LoadServerListResponse) {
  const buf = Buffer.alloc(0x04b0);

  buf.writeInt16LE(0x0007, 0x0000);
  buf.writeInt16LE(res.status, 0x0002);
  buf.write(res.userDb.addr, 0x0004);
  buf.writeInt16LE(res.userDb.tcp, 0x0084);
  buf.writeInt16LE(res.userDb.http, 0x0086);
  buf.write(res.matchAddr, 0x0088);
  buf.writeInt16LE(res.matchPort.tcp, 0x0108);
  buf.writeInt16LE(res.matchPort.udpSend, 0x010a);
  buf.writeInt16LE(res.matchPort.udpRecv, 0x010c);
  buf.writeInt16LE(res.tagMatchPort.tcp, 0x010e);
  buf.writeInt16LE(res.tagMatchPort.udpSend, 0x0110);
  buf.writeInt16LE(res.tagMatchPort.udpRecv, 0x0112);
  buf.write(res.event.addr, 0x0114);
  buf.writeInt16LE(res.event.tcp, 0x0194);
  buf.write(res.screenshot.addr, 0x0198);
  buf.writeInt16LE(res.screenshot.tcp, 0x0218);
  buf.write(res.pingReturn, 0x021c);
  buf.write(res.echo1.addr, 0x029c);
  buf.write(res.echo2.addr, 0x031c);
  buf.writeInt16LE(res.echo1.udp, 0x39c);
  buf.writeInt16LE(res.echo2.udp, 0x39e);
  buf.write(res.newsUrl, 0x03a0);
  buf.write(res.reportErrorUrl, 0x0424);

  return buf;
}
