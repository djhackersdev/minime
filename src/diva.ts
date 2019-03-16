import express = require("express");
import read = require("raw-body");

import { Form } from "multiparty";
import { inflateSync } from "zlib";

const app = express();

//
// Message I/O middleware
//

app.use(async function(req, res, next) {
  const send_ = res.send;

  res.send = function(kvps) {
    console.log("Response:", kvps);

    const bits: string[] = [];

    for (const key in kvps) {
      const val = kvps[key];
      const bit = [key, val].map(escape).join("=");

      bits.push(bit);
    }

    const str = bits.join("&");

    res.header("content-type", "text/plain");

    return send_.apply(res, [str]);
  };

  if (req.is("application/x-www-form-urlencoded")) {
    let line: string;

    if (req.header("pragma") === "DFI") {
      const raw = await read(req, "ascii");
      const z = Buffer.from(raw, "base64");
      const bytes = inflateSync(z);

      line = bytes.toString("utf8");
    } else {
      line = await read(req, "utf8");
    }

    const kvps = line.split("&");
    const body = {};

    for (const kvp of kvps) {
      const [key, val] = kvp.split("=").map(unescape);

      body[key] = val;
    }

    req.body = body;

    console.log("\n--- Diva ---\n");
    console.log("Request:", req.body);

    return next();
  } else if (req.is("multipart/form-data")) {
    const form = new Form();

    form.parse(req, function(err, fields, files) {
      if (err) {
        return next(err);
      }

      req.body = { ...files, ...fields };

      console.log("\n--- Diva (Multipart) ---\n");
      console.log("Request:", req.body);

      return next();
    });
  } else {
    return next(new Error("Unhandled content-type"));
  }
});

//
// Router
//

const routes = new Map<string, express.RequestHandler>();

app.post("/", function(req, res, next) {
  const route = routes.get(req.body.cmd);

  if (route === undefined) {
    res.status(404);
    res.end();
  } else {
    return route(req, res, next);
  }
});

//
// Routes
//

routes.set("game_init", function(req, res) {
  const { cmd, req_id } = req.body;

  res.send({
    cmd,
    req_id,
    stat: 1,
  });
});

export default app;
