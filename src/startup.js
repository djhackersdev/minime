const bodyParser = require('body-parser')
const leftPad = require('left-pad') // the infamous...
const express = require('express')
const zlib = require('zlib')
const os = require('os')

const services = new Map();

services.set("SDBT", 9000); // Chunithm

function decodeRequest(req) {
  const buf = Buffer.from(req, 'base64')
  const bytes = zlib.unzipSync(buf)
  const str = bytes.toString().trim()

  const kvps = str.split('&')
  const params = {}

  kvps.forEach(kvp => {
    const [ key, val ] = kvp.split('=')

    params[key] = val
  })

  return params
}

function encodeResponse(params) {
  const str = Object.entries(
    params
  ).map( ([ key, val ]) =>
    key + '=' + val
  ).join('&') // Keys and values are not URL-escaped

  return str + '\r\n'
}

const app = express()

// Startup request is url-encoded-ish... except it's also zlibed and base64ed.
// So in the absence of any exotic Transfer-Encoding headers this Content-Type
// is incorrect and we have to override Express' built-in handling.

app.use(bodyParser.raw({
  type: 'application/x-www-form-urlencoded',
}))

app.post('/sys/servlet/PowerOn', function (req, resp) {
  const reqParams = decodeRequest(req.body.toString())

  console.log('\n--- Startup Request ---\n\n', reqParams)

  const now = new Date()

  // Cut milliseconds out of ISO timestamp

  const isoStrWithMs = now.toISOString()
  const isoStr = isoStrWithMs.substr(0, 19) + 'Z'

  const respParams = {
    stat: 1,
    uri: `http://${os.hostname()}:${services.get(reqParams.game_id)}/`,
    host: '',
    place_id: '123',
    name: 'Name',
    nickname: 'Nick',
    region0: '1',
    region_name0: 'W',
    region_name1: 'X',
    region_name2: 'Y',
    region_name3: 'Z',
    country: 'JPN',
    allnet_id: '456',

    // Always UTC to simplify the segatools fake time system
    // (which is used to skip the hardcoded 2AM - 7AM warn/unplayable period)
    client_timezone: '+0000',

    utc_time: isoStr,
    setting: '',
    res_ver: '3',
    token: reqParams.token,
  }

  console.log('\n--- Startup Response ---\n\n', respParams)

  const respStrZ = encodeResponse(respParams)

  resp.send(respStrZ)
})

module.exports = app
