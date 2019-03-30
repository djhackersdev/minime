import { AimeRequest } from "./request";
import { setup } from "./pipeline";

export default async function aimedb(socket) {
  console.log("Aimedb: Connection opened");

  const { input, output } = setup(socket);

  try {
    for await (const obj of input) {
      const req = obj as AimeRequest;

      console.log("Aimedb: Decode", req);

      switch (req.type) {
        case "hello":
          console.log("Aimedb: Hello");
          output.write({ type: req.type, status: 1 });

          break;

        case "campaign":
          console.log("Aimedb: Campaign stuff");
          output.write({ type: req.type, status: 1 });

          break;

        case "lookup":
        case "lookup2":
          console.log("Aimedb: Mifare lookup", req.luid);
          output.write({
            type: req.type,
            status: 1,
            aimeId: 0x55667788,
          });

          break;

        case "register":
          // We get sent here if lookup does not return an aimeId

          console.log("Aimedb: Mifare register", req.luid);
          output.write({ type: req.type, status: 1, aimeId: 0x55667788 });

          break;

        case "log":
          console.log("Aimedb: Log message");
          output.write({ type: req.type, status: 1 });

          break;

        case "goodbye":
          console.log("Aimedb: Goodbye");

          break;

        default:
          console.log("Aimedb: Handler not implemented!");

          break;
      }
    }
  } catch (e) {
    console.log("Aimedb: Connection error:\n", e);
  }

  console.log("Aimedb: Connection closed\n");
  socket.end();
}
