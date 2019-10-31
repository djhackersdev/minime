import logger from "debug";
import { NextFunction, Router, Request, Response } from "express";

import { SqlRepositories } from "./_factory";
import { RpcHandler, RpcWrapper } from "../rpc";
import { DataSource } from "../../sql";

const debug = logger("app:chuni:handler");

export default function createSqlWrapper(db: DataSource): RpcWrapper {
  // We return a piece of middleware that delegates to an Express router

  const router = Router();

  // The ES6 class syntax is nice, but it lacks an `operator()` syntax, so we
  // have to do this the confusing and messy way. Declare an inner function and
  // then add "method" fields to the resulting function object.

  function self(req: Request, res: Response, next: NextFunction) {
    // Forward all requests to our embedded Express router
    return router(req, res, next);
  }

  self.rpc = function<Q, R>(path: string, handler: RpcHandler<Q, R>) {
    // Declare the RPC as a POST endpoint on the Express router as follows:
    router.post(path, async function(req, res) {
      // When you receive an HTTP request on this path...
      try {
        // return the JSON response returned by...
        res.json(
          // ... the provided handler, executing within an SQL transaction.
          await db.transaction(txn =>
            handler(new SqlRepositories(txn), req.body)
          )
        );
      } catch (e) {
        // .. unless something goes wrong of course
        if (debug.enabled) {
          debug("Error processing request: %s", e.stack);
        }

        res.sendStatus(500);
      }
    });

    // Allow .rpc() calls to be chained, since that's what Express' native
    // .post() etc methods do.

    return self;
  };

  // Done defining our Express middleware, so here it is:

  return self;
}
