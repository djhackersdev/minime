import "dotenv/config";

import fs = require("fs");
import https = require("https");
import http = require("http");
import net = require("net");

import aimedb from "./aimedb";
import billing from "./billing";
import chunithm from "./chunithm";
import diva from "./diva";
import idz from "./idz";
import idzPing from "./idz/ping";
import startup from "./startup";

const tls = {
  cert: fs.readFileSync("pki/server.pem"),
  key: fs.readFileSync("pki/server.key"),
};

net.createServer(aimedb).listen(22345);
http.createServer(startup).listen(80);
https.createServer(tls, billing).listen(8443);

http.createServer(chunithm).listen(9000);
http.createServer(diva).listen(9001);

net.createServer(idz).listen(10000);
idzPing(10001);
idzPing(10003);
idzPing(10010);
idzPing(10011);

console.log("Startup OK");
