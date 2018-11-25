const bodyParser = require('body-parser')
const leftPad = require('left-pad') // the infamous...
const express = require('express')
const zlib = require('zlib')
const os = require('os')

const app = express()
/*
app.use(bodyParser.raw({
  type: 'application/json'
}))
*/
app.use(express.json())
app.post('/ChuniServlet/GetGameSettingApi', function (req, resp) {

  const respParams = {
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
  }
  console.log('\n\nGetGameSettingApi')
  console.log('Request: '+JSON.stringify(req.body, null, 2))
  console.log('Response: ', respParams)
  resp.send(respParams)
})

app.post('/ChuniServlet/UpsertClientSettingApi', function (req, resp) {
  const respParams = {
	  returnCode: 1,
	  apiName: "UpsertClientSettingApi"
  }
  console.log('\n\nUpsertClientSettingApi')
  console.log('Request: '+JSON.stringify(req.body, null, 2))
  console.log('Response: ', respParams)
  resp.send(respParams)
})
app.post('/ChuniServlet/UpsertClientBookkeepingApi', function (req, resp) {
  const respParams = {
	  returnCode: 1,
	  apiName: "UpsertClientBookkeepingApi"
  }
  console.log('\n\nUpsertClientBookkeepingApi')
  console.log('Request: '+JSON.stringify(req.body, null, 2))
  console.log('Response: ', respParams)
  resp.send(respParams)
})
app.post('/ChuniServlet/UpsertClientTestmodeApi', function (req, resp) {
  const respParams = {
	  returnCode: 1,
	  apiName: "UpsertClientTestmodeApi"
  }
  console.log('\n\nUpsertClientTestmodeApi')
  console.log('Request: '+JSON.stringify(req.body, null, 2))
  console.log('Response: ', respParams)
  resp.send(respParams)
})
app.post('/ChuniServlet/UpsertClientErrorApi', function (req, resp) {
  const respParams = {
	  returnCode: 1,
	  apiName: "UpsertClientErrorApi"
  }
  console.log('\n\nUpsertClientErrorApi')
  console.log('Request: '+JSON.stringify(req.body, null, 2))
  console.log('Response: ', respParams)
  resp.send(respParams)
})
app.post('/ChuniServlet/UpsertClientDevelopApi', function (req, resp) {
  const respParams = {
	  returnCode: 1,
	  apiName: "UpsertClientDevelopApi"
  }
  console.log('\n\nUpsertClientDevelopApi')
  console.log('Request: '+JSON.stringify(req.body, null, 2))
  console.log('Response: ', respParams)
  resp.send(respParams)
})


//There appears to be some issue here - Game hangs on receipt of this response
app.post('/ChuniServlet/GetGameMessageApi', function (req, resp) {
  const respParams = {
	  type: 1,
	  length: 1,
	  gameMessageList: [{
	  	type: 2,
		id: 1,
		message: "true",
	   	startDate: "0",
		endDate: "0"
	  }],
  }
  console.log('\n\nGetGameMessageApi')
  console.log('Request:'+JSON.stringify(req.body, null, 2))
  console.log('Response:', respParams)
  resp.send(respParams)
}) 

module.exports = app
