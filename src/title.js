const express = require('express')

const app = express()

app.use(express.json())

app.use(function (req, resp, next) {
  console.log('\n--- Chunithm %s ---\n', req.url)
  console.log('Request:', req.body)

  const prevJson = resp.json

  resp.json = function (obj) {
    console.log('Response:', obj)

    resp.json = prevJson
    resp.json.apply(this, arguments)
  }

  next()
})

app.post('/ChuniServlet/GetGameSettingApi', function (req, resp) {
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
	  isAou: false
  })
})

app.post('/ChuniServlet/UpsertClientSettingApi', function (req, resp) {
  resp.json({
	  returnCode: 1,
	  apiName: "UpsertClientSettingApi"
  })
})

app.post('/ChuniServlet/UpsertClientBookkeepingApi', function (req, resp) {
  resp.json({
	  returnCode: 1,
	  apiName: "UpsertClientBookkeepingApi"
  })
})

app.post('/ChuniServlet/UpsertClientTestmodeApi', function (req, resp) {
  resp.json({
	  returnCode: 1,
	  apiName: "UpsertClientTestmodeApi"
  })
})

app.post('/ChuniServlet/UpsertClientErrorApi', function (req, resp) {
  resp.json({
	  returnCode: 1,
	  apiName: "UpsertClientErrorApi"
  })
})

app.post('/ChuniServlet/UpsertClientDevelopApi', function (req, resp) {
  resp.json({
	  returnCode: 1,
	  apiName: "UpsertClientDevelopApi"
  })
})

//There appears to be some issue here - Game hangs on receipt of this response
app.post('/ChuniServlet/GetGameMessageApi', function (req, resp) {
  resp.json({
	  type: 1,
	  length: 1,
	  gameMessageList: [{
	  	type: 2,
      id: 1,
      message: "true",
	   	startDate: "0",
      endDate: "0"
	  }],
  })
})

module.exports = app
