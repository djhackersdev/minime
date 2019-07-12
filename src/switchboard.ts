import * as os from "os";

const cfgHostExt: string | undefined = process.env.HOST_EXT;
const cfgHostInt: string | undefined = process.env.HOST_INT;

export const HOST_EXT = cfgHostExt !== undefined ? cfgHostExt : os.hostname();
export const HOST_INT = cfgHostInt !== undefined ? cfgHostInt : "127.0.0.1";

//
// Core services. These ports cannot be changed.
//

export const PORT_AIMEDB = 22345;
export const PORT_ALLNET = 80;
export const PORT_BILLING = 8443;

//
// Title services. These can be freely chosen.
//

export const PORT_CHUNITHM = 9001;
export const PORT_DIVA = 9000;
export const PORT_IDZ = {
  // Most of these seem to be unused relics

  USERDB: {
    TCP: 10000,
    HTTP: 10001,
  },
  MATCH: {
    TCP: 10002,
    UDP_SEND: 10003,
    UDP_RECV: 10004,
  },
  TAG_MATCH: {
    TCP: 10005,
    UDP_SEND: 10006,
    UDP_RECV: 10007,
  },
  EVENT: 10008,
  SCREENSHOT: 10009,
  ECHO1: 10010,
  ECHO2: 10011,
};

//
// Startup responses
//

const startupHosts = new Map<string, string>();

startupHosts.set("SDDF", `${HOST_EXT}:${PORT_IDZ.USERDB.TCP}`);

const startupUris = new Map<string, string>();

startupUris.set("SDBT", `http://${HOST_EXT}:${PORT_CHUNITHM}/`);
startupUris.set("SBZV", `http://${HOST_EXT}:${PORT_DIVA}/`);

export function startupHost(model: string): string {
  const val = startupHosts.get(model);

  return val !== undefined ? val : "";
}

export function startupUri(model: string): string {
  const val = startupUris.get(model);

  return val !== undefined ? val : "";
}

//
// Diagnostic dump
//

console.log(
  `Switchboard: HOST_EXT: ${HOST_EXT} (Service host name sent to clients)`
);
console.log(`Switchboard: HOST_INT: ${HOST_INT} (Bind address)`);

if (cfgHostExt === undefined || cfgHostInt === undefined) {
  console.log(
    "Switchboard: Warning: Check .env and env vars! Using unreliable fallback."
  );
}
