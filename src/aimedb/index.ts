import { setup } from "./pipeline";

export default async function aimedb(socket) {
  console.log("Aimedb: Connection opened");

  const { input, output } = setup(socket);

  try {
    for await (const req of input) {
      console.log("Aimedb: Decode", req);

      const { cmd } = req;

      switch (cmd) {
        case "hello":
          console.log("Aimedb: Hello");
          output.write({ cmd, status: 1 });

          break;

        case "campaign":
          console.log("Aimedb: Campaign stuff");
          output.write({ cmd, status: 1 });

          break;

        case "lookup":
          console.log("Aimedb: Mifare lookup", req.luid);
          output.write({ cmd, status: 1 }); // Add aimeId if desired

          break;

        case "register":
          // We get sent here if lookup does not return an aimeId

          console.log("Aimedb: Mifare register", req.luid);
          output.write({ cmd, status: 1, aimeId: 12345678 });

          break;

        case "log":
          console.log("Aimedb: Log message");
          output.write({ cmd, status: 1 });

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
