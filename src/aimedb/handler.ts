import logger from "debug";

import { Repositories } from "./repo";
import * as Req from "./request";
import * as Res from "./response";

const debug = logger("app:aimedb:ops");

function hello(
  rep: Repositories,
  req: Req.HelloRequest,
  now: Date
): Res.HelloResponse {
  debug("Hello");

  return { type: req.type, status: 1 };
}

function campaign(
  rep: Repositories,
  req: Req.CampaignRequest,
  now: Date
): Res.CampaignResponse {
  debug("Campaign stuff");

  return { type: req.type, status: 1 };
}

function feliCaLookup(
  rep: Repositories,
  req: Req.FeliCaLookupRequest,
  now: Date
): Res.FeliCaLookupResponse {
  debug("FeliCa access code lookup");

  // Well, this access code transformation is the million dollar question eh
  // Return a decimal representation for now.

  const num = BigInt("0x" + req.idm);
  let accessCode = num.toString();

  while (accessCode.length < 20) {
    accessCode = "0" + accessCode;
  }

  return { type: req.type, status: 1, accessCode };
}

async function feliCaLookup2(
  rep: Repositories,
  req: Req.FeliCaLookup2Request,
  now: Date
): Promise<Res.FeliCaLookup2Response> {
  debug("FeliCa access code lookup");

  const num = BigInt("0x" + req.idm);
  let accessCode = num.toString();

  while (accessCode.length < 20) {
    accessCode = "0" + accessCode;
  }

  return {
    type: req.type,
    status: 1,
    accessCode,
    aimeId: await rep.cards().lookup(accessCode, now),
  };
}

async function lookup(
  rep: Repositories,
  req: Req.LookupRequest,
  now: Date
): Promise<Res.LookupResponse> {
  debug("Mifare lookup: luid=%s", req.luid);

  return {
    type: req.type,
    status: 1,
    aimeId: await rep.cards().lookup(req.luid, now),
    registerLevel: "none",
  };
}

async function lookup2(
  rep: Repositories,
  req: Req.LookupRequest2,
  now: Date
): Promise<Res.LookupResponse2> {
  debug("FeliCa lookup: luid=%s", req.luid);

  return {
    type: req.type,
    status: 1,
    aimeId: await rep.cards().lookup(req.luid, now),
    registerLevel: "none",
  };
}

async function register(
  rep: Repositories,
  req: Req.RegisterRequest,
  now: Date
): Promise<Res.RegisterResponse> {
  debug("User register: luid=%s", req.luid);

  return {
    type: req.type,
    status: 1,
    aimeId: await rep.cards().register(req.luid, now),
  };
}

function log(
  rep: Repositories,
  req: Req.LogRequest,
  now: Date
): Res.LogResponse {
  debug("Log message");

  return { type: req.type, status: 1 };
}

export async function dispatch(
  rep: Repositories,
  req: Req.AimeRequest,
  now: Date
): Promise<Res.AimeResponse | undefined> {
  switch (req.type) {
    case "hello":
      return hello(rep, req, now);

    case "campaign":
      return campaign(rep, req, now);

    case "felica_lookup":
      return feliCaLookup(rep, req, now);

    case "felica_lookup2":
      return feliCaLookup2(rep, req, now);

    case "lookup":
      return lookup(rep, req, now);

    case "lookup2":
      return lookup2(rep, req, now);

    case "register":
      return register(rep, req, now);

    case "log":
      return log(rep, req, now);

    case "goodbye":
      debug("Goodbye");

      return undefined;

    default:
      const exhaust: never = req;

      throw new Error("Aimedb: Handler not implemented!");
  }
}
