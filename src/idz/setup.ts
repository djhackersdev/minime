import { createCipheriv, createDecipheriv } from "crypto";
import { Socket } from "net";
import { pipeline } from "stream";

import { byteString, modPow } from "./bigint";
import { Decoder } from "./decoder";
import { Encoder } from "./encoder";
import { Request } from "./request";
import { Response } from "./response";

// Proof-of-concept, so we only ever use one of the ten RSA key pairs
// (SEGA shipped their central server private keys for god knows what reason)

const key = {
  N: 4922323266120814292574970172377860734034664704992758249880018618131907367614177800329506877981986877921220485681998287752778495334541127048495486311792061n,
  d: 1163847742215766215216916151663017691387519688859977157498780867776436010396072628219119707788340687440419444081289736279466637153082223960965411473296473n,
  e: 3961365081960959178294197133768419551060435043430437330799371731939550352626564261219865471710058480523874787120718634318364066605378505537556570049131337n,
  hashN: 2662304617,
};

// Proof-of-concept, so we only use one fixed session key
const sessionKey = 0xffddeeccbbaa99887766554433221100n;

// -- TEST --
const test1 = modPow(sessionKey, key.e, key.N);
const test2 = modPow(test1, key.d, key.N);

console.log("RSA ENC    :", byteString(test1, 0x40).toString("hex"));
console.log("RSA ENCDEC :", byteString(test2, 0x40).toString("hex"));
// -- TEST --

interface Session {
  input: AsyncIterable<Request>;
  output: {
    write: (res: Response) => void;
  };
}

export default function setup(socket: Socket): Session {
  //
  // Construct and transmit setup message
  //

  const keyEnc = modPow(sessionKey, key.e, key.N);
  const msg = Buffer.alloc(0x48);

  msg.set(byteString(keyEnc, 0x40), 0x00);
  msg.writeUInt32LE(0x01020304, 0x40); // Meaning of this field is unknown
  msg.writeUInt32LE(key.hashN, 0x44);

  socket.write(msg);

  //
  // Set up pipeline
  //

  const keybuf = byteString(sessionKey, 0x10);
  const input = pipeline(
    socket,
    createDecipheriv("aes-128-ecb", keybuf, null).setAutoPadding(false),
    new Decoder()
  );

  const output = new Encoder();

  pipeline(
    output,
    createCipheriv("aes-128-ecb", keybuf, null).setAutoPadding(false),
    socket
  );

  return { input, output };
}
