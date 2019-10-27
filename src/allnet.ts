import addHours from "date-fns/add_hours";
import express from "express";
import iconv from "iconv-lite";
import logger from "debug";
import read from "raw-body";
import { unzipSync } from "zlib";

import { startupHost, startupUri } from "./switchboard";

const debug = logger("app:allnet");
const hourDelta = parseInt(process.env.HOUR_DELTA || "0");
const app = express();

// Startup request is url-encoded-ish... except it's also zlibed and base64ed.
// So in the absence of any exotic Transfer-Encoding headers this Content-Type
// is incorrect and we have to override Express' built-in handling.

app.use("/sys/servlet/PowerOn", async function(req, res, next) {
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

    const bin = iconv.encode(str, "shift_jis");

    return send_.apply(res, [bin]);
  };

  return next();
});

app.post("/sys/servlet/PowerOn", function(req, res) {
  debug("Startup request: %j", req.body);

  // Cut milliseconds out of ISO timestamp

  const now = new Date();
  const adjusted = addHours(now, -hourDelta);
  const isoStrWithMs = adjusted.toISOString();
  const isoStr = isoStrWithMs.substr(0, 19) + "Z";

  const resParams = {
    stat: 1,
    uri: startupUri(req.body.game_id),
    host: startupHost(req.body.game_id),
    place_id: "123",
    name: process.env.SHOP_NAME || "",
    nickname: process.env.SHOP_NAME || "",
    region0: "1",
    region_name0: "W",
    region_name1: "X",
    region_name2: "Y",
    region_name3: "Z",
    country: process.env.SHOP_REGION || "JPN",
    allnet_id: "456",
    client_timezone: "+0900",

    utc_time: isoStr,
    setting: "",
    res_ver: "3",
    token: req.body.token,
  };

  debug("Startup response: %j", resParams);

  res.send(resParams);
});

export default app;
