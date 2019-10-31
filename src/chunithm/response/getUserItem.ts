import { UserItemJson } from "../proto/userItem";

export interface GetUserItemResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  /**
   * Long.
   *
   * The behavior of this field has been determined through black-box trial and
   * error, not through any sort of systematic decompilation. However, it seems
   * that it can be characterized as follows:
   *
   * - If no further records of this `kind` are available then a
   *   negative number should be returned.
   * - If further records are available then return `kind` * `G` + `cookie`,
   *   where
   *    - `kind` is the `UserItemJson.kind` value extracted from the request
   *    - `G` is ten billion (smallest power of ten greater than 2**32)
   *    - `cookie` is probably any 32-bit integer context value you want
   *
   * @see GetUserJsonRequest
   */
  nextIndex: string;

  /**
   * Integer. Item kind, must match the `kind` value extracted from the
   * request in the manner described by the `GetUserJsonRequest` docs.
   */
  itemKind: string;

  /** List of items of the requested `kind` only */
  userItemList: UserItemJson[];
}
