import { Decipher, Cipher, createCipheriv, createDecipheriv } from "crypto";

import { ByteStream } from "../../util/stream";

export const BLOCK_SIZE = 16;

export default class AesEcbStream implements ByteStream {
  private readonly _dec: Decipher;
  private readonly _enc: Cipher;

  constructor(private _stm: ByteStream, keybuf: Buffer) {
    this._dec = createDecipheriv("aes-128-ecb", keybuf, null).setAutoPadding(
      false
    );
    this._enc = createCipheriv("aes-128-ecb", keybuf, null).setAutoPadding(
      false
    );
  }

  close() {
    this._stm.close();
  }

  async read(nbytes: number): Promise<Buffer> {
    if (nbytes % BLOCK_SIZE !== 0) {
      throw new Error("Attempted to read partial cipher block");
    }

    const ciphertext = await this._stm.read(nbytes);

    return this._dec.update(ciphertext);
  }

  async write(buf: Buffer): Promise<void> {
    if (buf.length % BLOCK_SIZE !== 0) {
      throw new Error("Attempted to write partial cipher block");
    }

    const ciphertext = this._enc.update(buf);

    await this._stm.write(ciphertext);
  }
}
