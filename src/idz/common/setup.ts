import { Socket } from "net";

import AesEcbStream from "./aes";
import { readBigInt, modPow, writeBigInt } from "./bigint";
import IoByteStream, { ByteStream } from "../../util/stream";

interface RsaKey {
  N: bigint;
  d: bigint;
  e: bigint;
  hashN: number;
}

export interface ClientHello {
  pcbId: string;
  protocol: string;
  model: string;
}

export interface IdzConnection {
  aesStream: ByteStream;
  clientHello: ClientHello;
}

// Proof-of-concept, so we only ever use one of the ten RSA key pairs
const rsaKey = {
  N: 4922323266120814292574970172377860734034664704992758249880018618131907367614177800329506877981986877921220485681998287752778495334541127048495486311792061n,
  d: 1163847742215766215216916151663017691387519688859977157498780867776436010396072628219119707788340687440419444081289736279466637153082223960965411473296473n,
  e: 3961365081960959178294197133768419551060435043430437330799371731939550352626564261219865471710058480523874787120718634318364066605378505537556570049131337n,
  hashN: 2662304617,
};

// Proof-of-concept, so we only use one fixed session key
const aesKey = Buffer.from("ffddeeccbbaa99887766554433221100", "hex");

function writeServerHello(aesKey: Buffer, rsaKey: RsaKey): Buffer {
  const M = readBigInt(aesKey);
  const keyEnc = modPow(M, rsaKey.e, rsaKey.N);
  const result = Buffer.alloc(0x48);

  result.set(writeBigInt(keyEnc, 0x40), 0x00);
  result.writeUInt32LE(0x01020304, 0x40); // Meaning is unknown
  result.writeUInt32LE(rsaKey.hashN, 0x44);

  return result;
}

function readClientHello(buf: Buffer) {
  const magic = buf.readUInt32LE(0x00);

  if (magic === 0xFE78571D) {
    throw new Error(
      "Server Box data, ignore."
    );
  }

  if (magic !== 0x01020304) {
    throw new Error(
      "Invalid magic number, cryptographic processing probably incorrect."
    );
  }

  return {
    pcbId: buf.slice(0x04, 0x0f).toString("ascii"),
    protocol: buf.slice(0x10, 0x13).toString("ascii"),
    model: buf.slice(0x18, 0x0c).toString("ascii"),
  };
}

export default async function setup(socket: Socket): Promise<IdzConnection> {
  const tcpStream = new IoByteStream(socket);
  const serverHello = writeServerHello(aesKey, rsaKey);

  await tcpStream.write(serverHello);

  const aesStream = new AesEcbStream(tcpStream, aesKey);

  const response = await aesStream.read(0x30);

  if (response.length !== 0x30) {
    throw new Error("Truncated client hello");
  }

  const clientHello = readClientHello(response);

  return { aesStream, clientHello };
}
