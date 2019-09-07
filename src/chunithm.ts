import compression = require("compression");
import express = require("express");

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
  console.log("\n--- Chunithm %s ---\n", req.url);
  console.log("Request:", req.body);

  const prevJson = resp.json;

  resp.json = function(obj) {
    console.log("Response:", obj);

    resp.json = prevJson;
    resp.json.apply(this, arguments);

    return resp;
  };

  next();
});

app.post("/ChuniServlet/GetGameSettingApi", function(req, resp) {
  resp.json({
    gameSetting: {
      dataVersion: 1,
      isMaintenance: false,
      requestInterval: 10,
      rebootStartTime: 0,
      rebootEndTime: 0,
      isBackgroundDistribute: false,
      maxCountCharacter: 999,
      maxCountItem: 999,
      maxCountMusic: 999,
    },
    isDumpUpload: false,
    isAou: false,
  });
});

app.post("/ChuniServlet/UpsertClientSettingApi", function(req, resp) {
  resp.json({
    returnCode: 1,
    apiName: "UpsertClientSettingApi",
  });
});

app.post("/ChuniServlet/UpsertClientBookkeepingApi", function(req, resp) {
  resp.json({
    returnCode: 1,
    apiName: "UpsertClientBookkeepingApi",
  });
});

app.post("/ChuniServlet/UpsertClientTestmodeApi", function(req, resp) {
  resp.json({
    returnCode: 1,
    apiName: "UpsertClientTestmodeApi",
  });
});

app.post("/ChuniServlet/UpsertClientErrorApi", function(req, resp) {
  resp.json({
    returnCode: 1,
    apiName: "UpsertClientErrorApi",
  });
});

app.post("/ChuniServlet/UpsertClientDevelopApi", function(req, resp) {
  resp.json({
    returnCode: 1,
    apiName: "UpsertClientDevelopApi",
  });
});

app.post("/ChuniServlet/GetGameMessageApi", function(req, resp) {
  resp.json({
    type: 1,
    length: 0,
    gameMessageList: [
      /*    {
        type: 2,
        id: 1,
        message: "true",
        startDate: "0",
        endDate: "0"
      },*/
    ],
  });
});

app.post("/ChuniServlet/GetGameIdlistApi", function(req, resp) {
  const { type } = req.body;

  resp.json({
    type,
    length: 0,
    gameIdlistList: [],
  });
});

app.post("/ChuniServlet/GetGameEventApi", function(req, resp) {
  resp.json({
    type: 1,
    length: 0,
    gameEventList: [
      /*
      {
        type: 1,
        id: 1102, // data/A000/event/event00001102
        startDate: 'STRINGIDK',
        endDate: 'STRINGIDK',
      },
    */
    ],
  });
});

app.post("/ChuniServlet/GetGameRankingApi", function(req, resp) {
  const { type } = req.body;

  resp.json({
    type,
    gameRankingList: [
      /*
      // QWORD fields maybe?
      {
        id: 1,
        point: 1,
      }
    */
    ],
  });
});

app.post("/ChuniServlet/GetGameSaleApi", function(req, resp) {
  const { type } = req.body;

  resp.json({
    type,
    length: 0,
    gameSaleList: [
      /*
      {
        orderId: 1234,
        type,
        id: 4321,
        rate: 5678,
        startDate: 'STRINGIDK',
        endDate: 'STRINGIDK',
      },
    */
    ],
  });
});

app.post("/ChuniServlet/GetGameChargeApi", function(req, resp) {
  resp.json({
    length: 0,
    gameChargeList: [
      /*
      {
        orderId: 1,
        chargeId: 1,
        price: 1,
        startDate: 'STRINGIDK',
        endDate: 'STRINGIDK',
        salePrice:
        saleStartDate: 'STRINGIDK',
        saleEndDate: 'STRINGIDK',
      },
    */
    ],
  });
});

export default app;
