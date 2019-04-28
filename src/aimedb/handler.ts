import { AimeRequest } from "./request";
import { AimeResponse } from "./response";

export function dispatch(req: AimeRequest): AimeResponse | undefined {
  switch (req.type) {
    case "hello":
      console.log("Aimedb: Hello");

      return { type: req.type, status: 1 };

    case "campaign":
      console.log("Aimedb: Campaign stuff");

      return { type: req.type, status: 1 };

    case "lookup":
      console.log("Aimedb: Mifare lookup v1", req.luid);

      return {
        type: req.type,
        status: 1,
        aimeId: 0x55667788,
        registerLevel: "none",
      };

    case "lookup2":
      console.log("Aimedb: Mifare lookup v2", req.luid);

      return {
        type: req.type,
        status: 1,
        aimeId: 0x55667788,
        registerLevel: "none",
      };

    case "register":
      // We get sent here if lookup does not return an aimeId

      console.log("Aimedb: Mifare register", req.luid);

      return { type: req.type, status: 1, aimeId: 0x55667788 };

    case "log":
      console.log("Aimedb: Log message");

      return { type: req.type, status: 1 };

    case "goodbye":
      console.log("Aimedb: Goodbye");

      return undefined;

    default:
      throw new Error("Aimedb: Handler not implemented!");
  }
}
