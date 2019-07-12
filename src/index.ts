import "dotenv/config";

import fs = require("fs");
import https = require("https");
import http = require("http");
import net = require("net");

import aimedb from "./aimedb";
import allnet from "./allnet";
import billing from "./billing";
import chunithm from "./chunithm";
import diva from "./diva";
import idz from "./idz";
import idzPing from "./idz/ping";
import * as Swb from "./switchboard";

const tls = {
  cert: fs.readFileSync("pki/server.pem"),
  key: fs.readFileSync("pki/server.key"),
};

net.createServer(aimedb).listen(Swb.PORT_AIMEDB, Swb.HOST_INT);
http.createServer(allnet).listen(Swb.PORT_ALLNET, Swb.HOST_INT);
https.createServer(tls, billing).listen(Swb.PORT_BILLING, Swb.HOST_INT);

http.createServer(chunithm).listen(Swb.PORT_CHUNITHM, Swb.HOST_INT);
http.createServer(diva).listen(Swb.PORT_DIVA, Swb.HOST_INT);

net.createServer(idz).listen(Swb.PORT_IDZ.USERDB.TCP, Swb.HOST_INT);
idzPing(10001, Swb.HOST_INT); // ?? tbd
idzPing(Swb.PORT_IDZ.MATCH.UDP_SEND, Swb.HOST_INT);
idzPing(Swb.PORT_IDZ.ECHO1, Swb.HOST_INT);
idzPing(Swb.PORT_IDZ.ECHO2, Swb.HOST_INT);

console.log("Startup OK");
