const crypto = require("crypto");
const { pipeline } = require("stream");

const { Deframer } = require("./frame");
const { Decoder, Encoder } = require("./cmd");

const K = Buffer.from("Copyright(C)SEGA", "utf8");

function setup(socket) {
  const input = pipeline(
    socket,
    crypto.createDecipheriv("aes-128-ecb", K, null).setAutoPadding(false),
    new Deframer(),
    new Decoder()
  );

  const output = new Encoder();

  pipeline(
    output,
    crypto.createCipheriv("aes-128-ecb", K, null).setAutoPadding(false),
    socket
  );

  return { input, output };
}

module.exports = setup;
