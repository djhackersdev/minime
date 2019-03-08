const bodyParser = require("body-parser");
const express = require("express");
const crypto = require("crypto");
const zlib = require("zlib");
const fs = require("fs");

const billingKeyPair = fs.readFileSync("pki/billing.key");

const playlimit = 1024;
const nearfull = 0x00010200;

// nearfull: high 16 bits is billing mode, low 16 bits is actual nearfull val.

const app = express();

function decodeRequest(buf) {
  const reqBytes = zlib.inflateRawSync(buf);
  const reqStr = reqBytes.toString();

  return reqStr
    .trim()
    .split("\r\n")
    .map(line => {
      // Crack key-value pairs

      const params = {};

      for (const kvp of line.split("&")) {
        const [key, val] = kvp.split("=");
        params[key] = val;
      }

      return params;
    });
}

function encodeResponse(items) {
  return (
    items
      .map(item =>
        Object.entries(item)
          .map(
            ([key, val]) => key + "=" + val // Keys,vals are not url escaped
          )
          .join("&")
      )
      .join("\r\n") + "\r\n"
  );
}

app.use(bodyParser.raw());

app.post("/request/", function(req, resp) {
  const reqItems = decodeRequest(req.body);

  console.log("\n--- Billing Request ---\n\n", reqItems);

  const first = reqItems[0];

  // Do cryptographic signatures

  const [playlimitsig, nearfullsig] = [playlimit, nearfull].map(value => {
    const buf = Buffer.alloc(15);

    buf.writeInt32LE(value, 0);
    buf.write(first.keychipid, 4);

    return crypto
      .createSign("RSA-SHA1")
      .update(buf)
      .sign(billingKeyPair, "hex");
  });

  // Assemble other params

  const respItems = [];

  respItems.push({
    // 0 or 6 is success, anything else is an error
    result: 0,

    // ???
    waittime: 100,

    // Some sort of bandwidth-limiting thing..?
    // "line" refers to the shop's internet connection
    linelimit: 1,

    // Server error message, copied to ALLNet debug log
    message: "",

    // Keychip odometer limit. Game will lock out if the odometer reaches
    // this value
    playlimit,

    // RSA-SHA1 signature for new odometer limit.
    playlimitsig,

    // idk
    protocolver: "1.000",

    // A compound of two values. High 16 bits is the billing mode, low 16 bits
    // is the actual "nearfull" value. Not sure exactly what nearfull is, at a
    // guess it causes the client to check-in with the billing server when the
    // odometer is fewer than this many ticks away from its current limit.
    nearfull,

    // RSA-SHA1 signature for the 32-bit nearfull value.
    nearfullsig,

    // ???
    fixlogcnt: 0,

    // ???
    fixinterval: 5,

    // Monthly play count summary, visible in operator menu. The value below
    // is for a virgin machine fresh from the factory. Another example might be:
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

  console.log("\n--- Billing Response ---\n\n", respItems);

  const respStr = encodeResponse(respItems);

  resp.set("content-type", "text/plain");
  resp.send(respStr);
});

module.exports = app;
