import { Repositories } from "./repo";
import * as Req from "./request";
import * as Res from "./response";

function hello(
  rep: Repositories,
  req: Req.HelloRequest,
  now: Date
): Res.HelloResponse {
  console.log("Aimedb: Hello");

  return { type: req.type, status: 1 };
}

function campaign(
  rep: Repositories,
  req: Req.CampaignRequest,
  now: Date
): Res.CampaignResponse {
  console.log("Aimedb: Campaign stuff");

  return { type: req.type, status: 1 };
}

async function lookup(
  rep: Repositories,
  req: Req.LookupRequest,
  now: Date
): Promise<Res.LookupResponse> {
  console.log("Aimedb: Mifare lookup v1", req.luid);

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
  console.log("Aimedb: Mifare lookup v2", req.luid);

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
  console.log("Aimedb: Mifare register", req.luid);

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
  console.log("Aimedb: Log message");

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

    case "lookup":
      return lookup(rep, req, now);

    case "lookup2":
      return lookup2(rep, req, now);

    case "register":
      return register(rep, req, now);

    case "log":
      return log(rep, req, now);

    case "goodbye":
      console.log("Aimedb: Goodbye");

      return undefined;

    default:
      throw new Error("Aimedb: Handler not implemented!");
  }
}
