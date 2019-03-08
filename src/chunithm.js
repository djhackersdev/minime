const express = require("express");
const zlib = require("zlib");

const app = express();

// Standard inbound JSON deserialization

app.use(express.json());

// Custom outbound JSON serialization that forces compression. Client tries to
// inflate the response whether you have a Transfer-Encoding header or not -.-

app.use(function(req, resp, next) {
  resp.json = function(obj) {
    const str = JSON.stringify(obj);
    const buf = Buffer.from(str);
    const comp = zlib.deflateSync(buf);

    resp.set("Content-Type", "application/json");
    resp.set("Content-Length", comp.length);
    resp.set("Transfer-Encoding", "deflate");
    resp.send(comp);
  };

  next();
});

// Trace requests and responses

app.use(function(req, resp, next) {
  console.log("\n--- Chunithm %s ---\n", req.url);
  console.log("Request:", req.body);

  const prevJson = resp.json;

  resp.json = function(obj) {
    console.log("Response:", obj);

    resp.json = prevJson;
    resp.json.apply(this, arguments);
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

module.exports = app;
