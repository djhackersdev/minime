import fs = require("fs");
import https = require("https");
import http = require("http");
import net = require("net");

import aimedb from "./aimedb";
import billing from "./billing";
import startup from "./startup";
import chunithm from "./chunithm";

const tls = {
  cert: fs.readFileSync("pki/server.pem"),
  key: fs.readFileSync("pki/server.key"),
};

net.createServer(aimedb).listen(22345);
http.createServer(startup).listen(80);
https.createServer(tls, billing).listen(8443);
http.createServer(chunithm).listen(9000);

console.log("Startup OK");
