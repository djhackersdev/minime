import { Readable } from "stream";

export default function makeReader(stm: Readable) {
  let remain = Buffer.alloc(0);
  let busy = false;

  return function read(nbytes: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      if (busy) {
        return reject(new Error("Already reading"));
      }

      //
      // Synchronous completion case
      //

      const result = Buffer.alloc(nbytes);
      const step = Math.min(remain.length, nbytes);

      remain.copy(result, 0, 0, step);
      remain = remain.slice(step);

      if (step === nbytes) {
        return resolve(result);
      }

      //
      // Asynchronous completion case
      //

      let pos = step;
      let finish: () => void;

      const onReadable = () => {
        while (true) {
          const chunk = stm.read() as (Buffer | null);

          if (chunk === null) {
            break;
          }

          const step = Math.min(result.length - pos, chunk.length);

          chunk.copy(result, pos, 0, step);
          remain = chunk.slice(step);
          pos += step;

          if (pos === result.length) {
            finish();
            resolve(result);
          }
        }
      };

      const onEnd = () => {
        finish();
        resolve(result.slice(0, pos));
      };

      const onError = error => {
        finish();
        reject(error);
      };

      finish = () => {
        stm.off("end", onEnd);
        stm.off("error", onError);
        stm.off("readable", onReadable);
        busy = false;
      };

      busy = true;
      stm.on("end", onEnd);
      stm.on("error", onError);
      stm.on("readable", onReadable);
    });
  };
}
