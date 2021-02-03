import { LoadConfigRequestA, LoadConfigRequestB } from "../request/loadConfig";
import {
  LoadConfigResponseA,
  LoadConfigResponseB,
} from "../response/loadConfig";
import { Repositories } from "../repo";
import { ClientHello } from "../../common";

export function loadConfig1(
  w: Repositories,
  req: LoadConfigRequestA,
  clientHello: ClientHello
): LoadConfigResponseA {
  return {
    type: "load_config_A_res",
    status: 1,

    // Only advertise up to v210 for now, advertising v230 to the v230 client
    // will activate a bunch of stuff that's currently broken.
    serverVersion: Math.min(parseInt(clientHello.protocol), 210),
  };
}

export function loadConfig2(
  w: Repositories,
  req: LoadConfigRequestB
): LoadConfigResponseB {
  return {
    type: "load_config_B_res",
    status: 1,
  };
}
