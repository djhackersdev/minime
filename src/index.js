const https = require('https')
const http = require('http')
const fs = require('fs')
const net = require('net')
const billing = require('./billing')
const startup = require('./startup')

const title = require('./title')

const tls = {
    cert: fs.readFileSync('pki/server.pem'),
    key: fs.readFileSync('pki/server.key'),
}

const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(22345, () => {
  console.log('server bound');
});

http.createServer(startup).listen(80)
https.createServer(tls, billing).listen(8443)
http.createServer(title).listen(9000)
