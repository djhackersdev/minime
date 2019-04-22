import { createCipheriv, createDecipheriv } from "crypto";
import { Socket } from "net";
import { pipeline as pipelineWithCallback } from "stream";
import { promisify } from "util";

import { byteString, modPow } from "./bigint";
import { Decoder } from "./decoder";
import { Encoder } from "./encoder";
import { Request } from "./request";
import { Response } from "./response";

// Drops the stupid mandatory callback parameter crap

const pipeline = promisify(pipelineWithCallback);

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

interface Session {
  input: AsyncIterable<Request> & {
    end: () => void;
  };
  output: {
    write: (res: Response) => void;
  };
}

function doNothing() {}

export function setup(socket: Socket): Session {
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

  const input = new Decoder();
  const output = new Encoder();
  const keybuf = byteString(sessionKey, 0x10);

  pipeline(
    socket,
    createDecipheriv("aes-128-ecb", keybuf, null).setAutoPadding(false),
    input
  ).catch(doNothing);

  pipeline(
    output,
    createCipheriv("aes-128-ecb", keybuf, null).setAutoPadding(false),
    socket
  ).catch(doNothing);

  return { input, output };
}
