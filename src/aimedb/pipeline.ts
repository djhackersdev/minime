import * as crypto from "crypto";
import { pipeline } from "stream";

import { Decoder } from "./decoder";
import { Deframer } from "./frame";
import { Encoder } from "./encoder";

const K = Buffer.from("Copyright(C)SEGA", "utf8");

export function setup(socket) {
  const input = pipeline(
    socket,
    crypto.createDecipheriv("aes-128-ecb", K, null).setAutoPadding(false),
    new Deframer({}),
    new Decoder({})
  );

  const output = new Encoder({});

  pipeline(
    output,
    crypto.createCipheriv("aes-128-ecb", K, null).setAutoPadding(false),
    socket
  );

  return { input, output };
}
