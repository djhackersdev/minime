import express = require("express");
import read = require("raw-body");

import { unzipSync } from "zlib";
import { hostname } from "os";

const myHost = hostname();
const uris = new Map<string, string>();

uris.set("SDBT", `http://${myHost}:9000/`); // Chunithm
uris.set("SBZV", `http://${myHost}:9001/`); // Project Diva Future Tone

const hosts = new Map<string, string>();

hosts.set("SDDF", `${myHost}:10000`); // Initial D Zero

const app = express();

// Startup request is url-encoded-ish... except it's also zlibed and base64ed.
// So in the absence of any exotic Transfer-Encoding headers this Content-Type
// is incorrect and we have to override Express' built-in handling.

app.use(async function(req, res, next) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (!req.is("application/x-www-form-urlencoded")) {
    return next();
  }

  const base64 = await read(req, { encoding: "ascii" });
  const zbytes = Buffer.from(base64, "base64");
  const bytes = unzipSync(zbytes);
  const str = bytes.toString("ascii").trim();

  const kvps = str.split("&");
  const reqParams = {};

  // Keys and values are not URL-escaped

  kvps.forEach(kvp => {
    const [key, val] = kvp.split("=");

    reqParams[key] = val;
  });

  const send_ = res.send;

  req.body = reqParams;
  res.send = resParams => {
    const str =
      Object.entries(resParams)
        .map(([key, val]) => key + "=" + val)
        .join("&") + "\n";

    res.set("content-type", "text/plain");

    return send_.apply(res, [str]);
  };

  return next();
});

app.post("/sys/servlet/PowerOn", function(req, resp) {
  console.log("\n--- Startup Request ---\n\n", req.body);

  // Cut milliseconds out of ISO timestamp

  const now = new Date();
  const isoStrWithMs = now.toISOString();
  const isoStr = isoStrWithMs.substr(0, 19) + "Z";

  const resParams = {
    stat: 1,
    uri: uris.get(req.body.game_id) || "",
    host: hosts.get(req.body.game_id) || "",
    place_id: "123",
    name: "Name",
    nickname: "Nick",
    region0: "1",
    region_name0: "W",
    region_name1: "X",
    region_name2: "Y",
    region_name3: "Z",
    country: "JPN",
    allnet_id: "456",

    // Always UTC to simplify the segatools fake time system
    // (which is used to skip the hardcoded 2AM - 7AM warn/unplayable period)
    client_timezone: "+0000",

    utc_time: isoStr,
    setting: "",
    res_ver: "3",
    token: req.body.token,
  };

  console.log("\n--- Startup Response ---\n\n", resParams);

  resp.send(resParams);
});

export default app;
