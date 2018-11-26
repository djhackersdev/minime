const https = require('https')
const http = require('http')
const fs = require('fs')
const net = require('net')
const billing = require('./billing')
const startup = require('./startup')
const crypto = require('crypto')
const title = require('./title')

const tls = {
    cert: fs.readFileSync('pki/server.pem'),
    key: fs.readFileSync('pki/server.key'),
}

function encodeAimeBody(buf) {
   const keyBuf = Buffer.from('Copyright(C)SEGA', 'utf8')
   const ivBuf = Buffer.from('0x00', 'hex')
   let cipher = crypto.createCipheriv('aes-128-ecb', keyBuf, ivBuf)
   cipher.setAutoPadding(false)
   crypted = Buffer.concat([cipher.update(buf), cipher.final()])
   return crypted
}
function decodeAimeBody(buf) {
   const keyBuf = Buffer.from('Copyright(C)SEGA', 'utf8')
   const ivBuf = Buffer.from('0x00', 'hex')
   let decipher = crypto.createDecipheriv('aes-128-ecb', keyBuf, ivBuf)
   decipher.setAutoPadding(false)
   decrypted = Buffer.concat([decipher.update(buf), decipher.final()])
   return decrypted
}
function parseMessage(buf) {
   switch(buf[4].toString(16)) {
      case "64":
	var newBuffer = new Buffer.from([0x3e, 0xa1, 0x87, 0x30, 0x65, 0x00, 0x20, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]);
	console.log(newBuffer)
	return newBuffer
	break;
      case "66":
	var newBuffer = new Buffer.from([0x3e, 0xa1, 0x87, 0x30, 0x67, 0x00, 0x20, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]);
	console.log(newBuffer)
	return newBuffer
	break;
      default:
        console.log("No case for "+buf[4].toString(16))
	return null
   }

}

const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on('error', (err) => { throw err; });
  c.on('data', (data) => {
    decode = decodeAimeBody(data);
    encode = encodeAimeBody(decodeAimeBody(data)).toString('hex')+'\r\n'
    console.log('Decode: '+decode.toString('hex'))
    c.write(encodeAimeBody(parseMessage(decode)))
  });
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
