import { Writable } from "stream";

export default function makeWriter(stm: Writable) {
  let busy = false;

  return function write(buf: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      if (busy) {
        return reject(new Error("Already writing"));
      }

      busy = true;

      stm.write(buf, error => {
        busy = false;

        if (error !== undefined) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
}
