import { RequestHandler } from "express";

import { Repositories } from "./repo";

/**
 * An async function that is supplied with an implementation of the
 * `Repositories` instance and uses it to transform a JSON request into a
 * JSON response.
 */
export type RpcHandler<Q, R> = (rep: Repositories, reqObj: Q) => Promise<R>;

/**
 * This describes a piece of router-like Express middleware that provides the
 * connective tissue between an HTTP request scope and the life cycle of an
 * implementation of the `Repositories` persistent data storage interface. Call
 * `rpc()` to declare async JSON RPC handlers, then once that's fully prepared
 * you can pass the implementation of this type to Express.
 */
export type RpcWrapper = RequestHandler & {
  rpc: <Q, R>(path: string, handler: RpcHandler<Q, R>) => RpcWrapper;
};
