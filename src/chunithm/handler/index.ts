import compression from "compression";
import express, { NextFunction, Request, Response } from "express";
import logger from "debug";

import gameLogin from "./gameLogin";
import gameLogout from "./gameLogout";
import getGameCharge from "./getGameCharge";
import getGameEvent from "./getGameEvent";
import getGameIdlist from "./getGameIdlist";
import getGameMessage from "./getGameMessage";
import getGameRanking from "./getGameRanking";
import getGameSale from "./getGameSale";
import getGameSetting from "./getGameSetting";
import getUserActivity from "./getUserActivity";
import getUserCharacter from "./getUserCharacter";
import getUserCharge from "./getUserCharge";
import getUserCourse from "./getUserCourse";
import getUserData from "./getUserData";
import getUserDataEx from "./getUserDataEx";
import getUserDuel from "./getUserDuel";
import getUserFavoriteMusic from "./getUserFavoriteMusic";
import getUserItem from "./getUserItem";
import getUserMap from "./getUserMap";
import getUserMusic from "./getUserMusic";
import getUserOption from "./getUserOption";
import getUserOptionEx from "./getUserOptionEx";
import getUserPreview from "./getUserPreview";
import getUserRecentRating from "./getUserRecentRating";
import getUserRegion from "./getUserRegion";
import upsertClientBookkeeping from "./upsertClientBookkeeping";
import upsertClientDevelop from "./upsertClientDevelop";
import upsertClientError from "./upsertClientError";
import upsertClientSetting from "./upsertClientSetting";
import upsertClientTestmode from "./upsertClientTestmode";
import upsertUserAll from "./upsertUserAll";
import upsertUserChargelogApi from "./upsertUserChargelogApi";
import createSqlWrapper from "../sql";
import { DataSource } from "../../sql";

const debug = logger("app:chuni:io");

// Thankfully we can use standard middleware for JSON I/O. We have to use a
// zlib middleware as well because compression is non-optional: the client will
// attempt to inflate whatever response we send to it whether there's a
// Transfer-Encoding header or not.

function quirks(req: Request, res: Response, next: NextFunction) {
  // Chunithm client does not follow the HTTP spec: user agents must indicate
  // that they are willing to accept a particular Transfer-Encoding for that
  // T-E to be used (unless the T-E in question is "chunked" but w/e), and this
  // indication is advisory anyway, the server is permitted to ignore it.
  //
  // Force this header into the request, since it is not present normally.

  // ... unless, that is, the client is actually somebody debugging with curl
  // and not the real game client, in which case this forced deflate can be
  // annoying. Pass an "X-Debug" request header to suppress forced compression.

  if (req.headers["x-debug"] === undefined) {
    req.headers["accept-encoding"] = "deflate";
  }

  return next();
}

function trace(req: Request, res: Response, next: NextFunction) {
  debug("\n--- Chunithm %s ---\n", req.url);
  debug("Request: %j", req.body);

  const prevJson = res.json;

  res.json = function(obj) {
    debug("Response: %j", obj);

    res.json = prevJson;
    res.json.apply(this, arguments);

    return res;
  };

  return next();
}

export default function chunithm(db: DataSource) {
  const wrapper = createSqlWrapper(db);

  wrapper.rpc("/GameLoginApi", gameLogin);
  wrapper.rpc("/GameLogoutApi", gameLogout);
  wrapper.rpc("/GetGameChargeApi", getGameCharge);
  wrapper.rpc("/GetGameEventApi", getGameEvent);
  wrapper.rpc("/GetGameIdlistApi", getGameIdlist);
  wrapper.rpc("/GetGameMessageApi", getGameMessage);
  wrapper.rpc("/GetGameRankingApi", getGameRanking);
  wrapper.rpc("/GetGameSaleApi", getGameSale);
  wrapper.rpc("/GetGameSettingApi", getGameSetting);
  wrapper.rpc("/GetUserActivityApi", getUserActivity);
  wrapper.rpc("/GetUserCharacterApi", getUserCharacter);
  wrapper.rpc("/GetUserChargeApi", getUserCharge);
  wrapper.rpc("/GetUserCourseAPi", getUserCourse);
  wrapper.rpc("/GetUserDataApi", getUserData);
  wrapper.rpc("/GetUserDataExApi", getUserDataEx);
  wrapper.rpc("/GetUserDuelApi", getUserDuel);
  wrapper.rpc("/GetUserFavoriteMusicApi", getUserFavoriteMusic);
  wrapper.rpc("/GetUserItemApi", getUserItem);
  wrapper.rpc("/GetUserMapApi", getUserMap);
  wrapper.rpc("/GetUserMusicApi", getUserMusic);
  wrapper.rpc("/GetUserOptionApi", getUserOption);
  wrapper.rpc("/GetUserOptionExApi", getUserOptionEx);
  wrapper.rpc("/GetUserPreviewApi", getUserPreview);
  wrapper.rpc("/GetUserRecentPlayerApi", getUserRecentRating);
  wrapper.rpc("/GetUserRecentRatingApi", getUserRecentRating);
  wrapper.rpc("/GetUserRegionApi", getUserRegion);
  wrapper.rpc("/UpsertClientBookkeepingApi", upsertClientBookkeeping);
  wrapper.rpc("/UpsertClientDevelopApi", upsertClientDevelop);
  wrapper.rpc("/UpsertClientErrorApi", upsertClientError);
  wrapper.rpc("/UpsertClientSettingApi", upsertClientSetting);
  wrapper.rpc("/UpsertClientTestmodeApi", upsertClientTestmode);
  wrapper.rpc("/UpsertUserAllApi", upsertUserAll);
  wrapper.rpc("/UpsertUserChargelogApi", upsertUserChargelogApi)

  const app = express();

  app.use(quirks);
  app.use(compression({ threshold: 0 }));
  app.use(express.json({ limit: "50mb" })); // that ought to be enough
  app.use(trace);

  app.use("/ChuniServlet", wrapper);

  return app;
}
