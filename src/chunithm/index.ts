import compression from "compression";
import express from "express";
import logger from "debug";

import getGameCharge from "./getGameCharge";
import getGameEvent from "./getGameEvent";
import getGameIdlist from "./getGameIdlist";
import getGameMessage from "./getGameMessage";
import getGameRanking from "./getGameRanking";
import getGameSale from "./getGameSale";
import getGameSetting from "./getGameSetting";
import upsertClientBookkeeping from "./upsertClientBookkeeping";
import upsertClientDevelop from "./upsertClientDevelop";
import upsertClientError from "./upsertClientError";
import upsertClientSetting from "./upsertClientSetting";
import upsertClientTestmode from "./upsertClientTestmode";

const debug = logger("app:chuni:io");
const app = express();

// Thankfully we can use standard middleware for JSON I/O. We have to use a
// zlib middleware as well because compression is non-optional: the client will
// attempt to inflate whatever response we send to it whether there's a
// Transfer-Encoding header or not.

app.use(function(req, res, next) {
  // Chunithm client does not follow the HTTP spec: user agents must indicate
  // that they are willing to accept a particular Transfer-Encoding for that
  // T-E to be used (unless the T-E in question is "chunked" but w/e), and this
  // indication is advisory anyway, the server is permitted to ignore it.
  //
  // Force this header into the request, since it is not present normally.

  req.headers["accept-encoding"] = "deflate";

  return next();
});

app.use(compression({ threshold: 0 }));
app.use(express.json());

// Trace requests and responses

app.use(function(req, resp, next) {
  debug(`\n--- Chunithm ${req.url} ---\n`);
  debug(`Request: ${JSON.stringify(req.body)}\n`);

  const prevJson = resp.json;

  resp.json = function(obj) {
    debug(`Response: ${JSON.stringify(obj)}`);

    resp.json = prevJson;
    resp.json.apply(this, arguments);

    return resp;
  };

  next();
});

app.post("/ChuniServlet/GetGameChargeApi", getGameCharge);
app.post("/ChuniServlet/GetGameEventApi", getGameEvent);
app.post("/ChuniServlet/GetGameIdlistApi", getGameIdlist);
app.post("/ChuniServlet/GetGameMessageApi", getGameMessage);
app.post("/ChuniServlet/GetGameRankingApi", getGameRanking);
app.post("/ChuniServlet/GetGameSaleApi", getGameSale);
app.post("/ChuniServlet/GetGameSettingApi", getGameSetting);
app.post("/ChuniServlet/UpsertClientBookkeepingApi", upsertClientBookkeeping);
app.post("/ChuniServlet/UpsertClientDevelopApi", upsertClientDevelop);
app.post("/ChuniServlet/UpsertClientErrorApi", upsertClientError);
app.post("/ChuniServlet/UpsertClientSettingApi", upsertClientSetting);
app.post("/ChuniServlet/UpsertClientTestmodeApi", upsertClientTestmode);

export default app;
