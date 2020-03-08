// Import environment variables from .env ASAP...

import "dotenv/config";

// ..but globally force all date and time processing to operate in UTC.
// Do not allow this to be overridden by .env either.

process.env.TZ = "UTC";

import fs from "fs";
import https from "https";
import http from "http";
import net from "net";

import aimedb from "./aimedb";
import allnet from "./allnet";
import billing from "./billing";
import checkdb from "./checkdb";
import chunithm from "./chunithm";
import diva from "./diva";
import idzPing from "./idz/ping";
import idzUserDb from "./idz/userdb";
import { openSqlite } from "./sql";
import * as Swb from "./switchboard";

(async function() {
  fs.mkdirSync("./data", { recursive: true });

  const db = openSqlite("./data/db.sqlite3");

  try {
    await checkdb(db);
  } catch (e) {
    console.error(e);

    return;
  }

  const tls = {
    cert: fs.readFileSync("pki/server.pem"),
    key: fs.readFileSync("pki/server.key"),
  };

  net.createServer(aimedb(db)).listen(Swb.PORT_AIMEDB, Swb.HOST_INT);
  http.createServer(allnet).listen(Swb.PORT_ALLNET, Swb.HOST_INT);
  https.createServer(tls, billing).listen(Swb.PORT_BILLING, Swb.HOST_INT);

  http.createServer(chunithm(db)).listen(Swb.PORT_CHUNITHM, Swb.HOST_INT);
  http.createServer(diva).listen(Swb.PORT_DIVA, Swb.HOST_INT);

  net
    .createServer(idzUserDb(db))
    .listen(Swb.PORT_IDZ.USERDB.TCP, Swb.HOST_INT);
  idzPing(10001, Swb.HOST_INT); // ?? tbd
  idzPing(Swb.PORT_IDZ.MATCH.UDP_SEND, Swb.HOST_INT);
  idzPing(Swb.PORT_IDZ.ECHO1, Swb.HOST_INT);
  idzPing(Swb.PORT_IDZ.ECHO2, Swb.HOST_INT);

  console.log("Startup OK");
})();
