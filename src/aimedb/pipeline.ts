import * as crypto from "crypto";
import { Socket } from "net";
import { pipeline } from "stream";

import { Decoder } from "./decoder";
import { Deframer } from "./frame";
import { Encoder } from "./encoder";
import { AimeRequest } from "./request";
import { AimeResponse } from "./response";

const K = Buffer.from("Copyright(C)SEGA", "utf8");

export interface Session {
  input: AsyncIterable<AimeRequest>;
  output: {
    write(res: AimeResponse): void;
  };
}

export function setup(socket: Socket): Session {
  const input = pipeline(
    socket,
    crypto.createDecipheriv("aes-128-ecb", K, null).setAutoPadding(false),
    new Deframer({}),
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
