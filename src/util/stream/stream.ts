import { Duplex } from "stream";

import makeReader from "./reader";
import { ByteStream } from "./types";
import makeWriter from "./writer";

export default class IoByteStream implements ByteStream {
  private _stm?: Duplex;
  private readonly _read: (nbytes: number) => Promise<Buffer>;
  private readonly _write: (buf: Buffer) => Promise<void>;

  constructor(stm: Duplex) {
    this._stm = stm;
    this._read = makeReader(stm);
    this._write = makeWriter(stm);
  }

  close() {
    if (this._stm !== undefined) {
      this._stm.destroy();
    }

    this._stm = undefined;
  }

  read(nbytes: number): Promise<Buffer> {
    if (this._stm === undefined) {
      throw new Error("Stream is closed");
    }

    return this._read(nbytes);
  }

  write(buf: Buffer): Promise<void> {
    if (this._stm === undefined) {
      throw new Error("Stream is closed");
    }

    return this._write(buf);
  }
}
