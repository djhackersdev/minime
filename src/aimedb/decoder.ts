import logger from "debug";
import { Transform } from "stream";

import * as Request from "./request";

const debug = logger("app:aimedb:decoder");

function begin(msg: Buffer): Request.AimeRequestBase {
  const gameId = msg.toString("ascii", 0x000a, 0x000e);
  const keychipId = msg.toString("ascii", 0x0014, 0x001f);

  return { gameId, keychipId };
}

function readRegisterRequest(msg: Buffer): Request.RegisterRequest {
  const luid = msg.slice(0x0020, 0x002a).toString("hex");

  return {
    ...begin(msg),
    type: "register",
    luid,
  };
}

function readFeliCaLookupRequest(msg: Buffer): Request.FeliCaLookupRequest {
  return {
    ...begin(msg),
    type: "felica_lookup",
    idm: msg.slice(0x0020, 0x0028).toString("hex"),
    pmm: msg.slice(0x0028, 0x0030).toString("hex"),
  };
}

function readFeliCaLookupRequest2(msg: Buffer): Request.FeliCaLookup2Request {
  return {
    ...begin(msg),
    type: "felica_lookup2",
    idm: msg.slice(0x0030, 0x0038).toString("hex"),
    pmm: msg.slice(0x0038, 0x0040).toString("hex"),
  };
}

function readLogRequest(msg: Buffer): Request.LogRequest {
  // idk what any of this stuff means yet
  // field20 and field28 appear to be an aime id but that is all.

  return {
    ...begin(msg),
    type: "log",
    field20: msg.readUInt32LE(0x20),
    field24: msg.readUInt32LE(0x24),
    field28: msg.readUInt32LE(0x28),
    field2C: msg.readUInt32LE(0x2c),
    field30: msg.readUInt32LE(0x30),
    field34: msg.readUInt32LE(0x34),
    field38: msg.readUInt32LE(0x38),
    field3C: msg.readUInt32LE(0x3c),
  };
}

function readCampaignRequest(msg: Buffer): Request.CampaignRequest {
  return {
    ...begin(msg),
    type: "campaign",
  };
}

function readLookupRequest(msg: Buffer): Request.LookupRequest {
  const luid = msg.slice(0x0020, 0x002a).toString("hex");

  return {
    ...begin(msg),
    type: "lookup",
    luid,
  };
}

function readLookupRequest2(msg: Buffer): Request.LookupRequest2 {
  const luid = msg.slice(0x0020, 0x002a).toString("hex");

  return {
    ...begin(msg),
    type: "lookup2",
    luid,
  };
}

function readHelloRequest(msg: Buffer): Request.HelloRequest {
  return {
    ...begin(msg),
    type: "hello",
  };
}

function readGoodbyeRequest(msg: Buffer): Request.GoodbyeRequest {
  return {
    type: "goodbye",
  };
}

const readers = new Map<number, (msg: Buffer) => Request.AimeRequest>();

readers.set(0x0001, readFeliCaLookupRequest);
readers.set(0x0004, readLookupRequest);
readers.set(0x0005, readRegisterRequest);
readers.set(0x0009, readLogRequest);
readers.set(0x000b, readCampaignRequest);
readers.set(0x000d, readRegisterRequest);
readers.set(0x000f, readLookupRequest2);
readers.set(0x0011, readFeliCaLookupRequest2);
readers.set(0x0064, readHelloRequest);
readers.set(0x0066, readGoodbyeRequest);

export class Decoder extends Transform {
  constructor() {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
    });
  }

  _transform(msg: Buffer, encoding, callback) {
    const code = msg.readUInt16LE(0x04);
    const reader = readers.get(code);

    if (reader === undefined) {
      return callback(
        new Error(`Unknown command code 0x${code.toString(16)}`)
      );
    }

    const obj = reader(msg);

    debug("Decode %j", obj);

    return callback(null, obj);
  }
}
