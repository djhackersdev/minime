import fs = require("fs");
import https = require("https");
import http = require("http");
import net = require("net");

import aimedb from "./aimedb";
import billing from "./billing";
import chunithm from "./chunithm";
import diva from "./diva";
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

console.log("Startup OK");
