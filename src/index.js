const fs = require('fs')
const https = require('https')
const http = require('http')
const net = require('net')

const aimedb = require('./aimedb')
const billing = require('./billing')
const startup = require('./startup')
const chunithm = require('./chunithm')

const tls = {
    cert: fs.readFileSync('pki/server.pem'),
    key: fs.readFileSync('pki/server.key'),
}

net.createServer(aimedb).listen(22345)
http.createServer(startup).listen(80)
https.createServer(tls, billing).listen(8443)
http.createServer(chunithm).listen(9000)
