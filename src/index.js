const https = require('https')
const http = require('http')
const fs = require('fs')

const billing = require('./billing')
const startup = require('./startup')

const tls = {
    cert: fs.readFileSync('pki/server.pem'),
    key: fs.readFileSync('pki/server.key'),
}

http.createServer(startup).listen(80)
https.createServer(tls, billing).listen(8443)
