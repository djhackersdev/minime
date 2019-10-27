import express from "express";
import logger from "debug";
import read from "raw-body";

import { createSign } from "crypto";
import { inflateRawSync } from "zlib";
import { readFileSync } from "fs";

interface Kvps {
  [key: string]: string;
}

const debug = logger("app:billing");
const billingKeyPair = readFileSync("pki/billing.key");

// nearfull: high 16 bits is billing mode, low 16 bits is actual nearfull val.

const playlimit = 1024;
const nearfull = 0x00010200;

const app = express();

app.use(async function(req, res, next) {
  const reqBytesZ = await read(req);
  const reqBytes = inflateRawSync(reqBytesZ);
  const reqStr = reqBytes.toString("ascii");

  req.body = reqStr
    .trim()
    .split("\r\n")
    .map(line => {
      // Crack key-value pairs. There is no URI encoding here.
      const params = {};

      for (const kvp of line.split("&")) {
        const [key, val] = kvp.split("=");

        params[key] = val;
      }

      return params;
    });

  const send_ = res.send;

  res.send = (lines: Kvps[]) => {
    const str =
      lines
        .map(line =>
          Object.entries(line)
            .map(([key, val]) => key + "=" + val)
            .join("&")
        )
        .join("\r\n") + "\r\n";

    res.set("content-type", "text/plain");

    return send_.apply(res, [str]);
  };

  return next();
});

app.post("/request/", function(req, res) {
  debug("Billing request: %j", req.body);

  const first = req.body[0];

  // Do cryptographic signatures

  const [playlimitsig, nearfullsig] = [playlimit, nearfull].map(value => {
    const buf = Buffer.alloc(15);

    buf.writeInt32LE(value, 0);
    buf.write(first.keychipid, 4);

    return createSign("RSA-SHA1")
      .update(buf)
      .sign(billingKeyPair, "hex");
  });

  // Assemble other params

  const resItems: Kvps[] = [];

  resItems.push({
    // 0 or 6 is success, anything else is an error
    result: "0",

    // ???
    waittime: "100",

    // Some sort of bandwidth-limiting thing..?
    // "line" refers to the shop's internet connection
    linelimit: "1",

    // Server error message, copied to ALLNet debug log
    message: "",

    // Keychip odometer limit. Game will lock out if the odometer reaches
    // this value
    playlimit: playlimit.toString(),

    // RSA-SHA1 signature for new odometer limit.
    playlimitsig,

    // idk
    protocolver: "1.000",

    // A compound of two values. High 16 bits is the billing mode, low 16 bits
    // is the actual "nearfull" value. Not sure exactly what nearfull is, at a
    // guess it causes the client to check-in with the billing server when the
    // odometer is fewer than this many ticks away from its current limit.
    nearfull: nearfull.toString(),

    // RSA-SHA1 signature for the 32-bit nearfull value.
    nearfullsig,

    // ???
    fixlogcnt: "0",

    // ???
    fixinterval: "5",

    // Monthly play count summary, visible in operator menu. The value below
    // is for a virgin machine fresh from the factory. Another example might be
    //
    // 201809/123:201810/456:201811/789
    //
    // which means
    //
    // Month 2018/09: 123 total plays
    // Month 2018/10: 456 total plays
    // Month 2018/11: 789 total plays
    playhistory: "000000/0:000000/0:000000/0",
  });

  debug("Billing response: %j", resItems);

  res.set("content-type", "text/plain");
  res.send(resItems);
});

export default app;
