import { readAimeId } from "../proto/base";
import { writeUserItem } from "../proto/userItem";
import { Repositories } from "../repo";
import { GetUserItemRequest } from "../request/getUserItem";
import { GetUserItemResponse } from "../response/getUserItem";
import { UserItemItem } from "../model/userItem";

// I'm not sure why they went to all this trouble just to avoid passing an
// explicit `itemKind` parameter in the request...

const itemKindMul = 10000000000n;

export default async function getUserItem(
  rep: Repositories,
  req: GetUserItemRequest
): Promise<GetUserItemResponse> {
  // Split the "nextIndex" parameter

  const compoundIn = BigInt(req.nextIndex);
  const itemKindN = compoundIn / itemKindMul;
  const nextIndexN = compoundIn % itemKindMul;

  // Now unpack the entire request

  const aimeId = readAimeId(req.userId);
  const maxCount = parseInt(req.maxCount);
  const itemKind = parseInt(itemKindN as any);
  const nextIndex = parseInt(nextIndexN as any);

  // Hit DB
  // This gets called for not-yet-created profiles for some reason (probably
  // so that the server can force some bonus items into a new profile's
  // inventory)? So we need to gracefully handle that condition.

  // (maybe some sort of anchor row is created on first GameLogin...)

  const profileId = await rep.userData().tryLookup(aimeId);
  let items: UserItemItem[];

  if (profileId !== undefined) {
    items = await rep
      .userItem()
      .load(profileId, itemKind, { limit: maxCount, offset: nextIndex });
  } else {
    items = [];
  }

  // Pack the next pagination cookie into bigint compound form

  const xout = itemKindN * itemKindMul + nextIndexN + BigInt(items.length);

  // Done:

  return {
    userId: req.userId,
    length: items.length.toString(),
    nextIndex: items.length < maxCount ? "-1" : xout.toString(),
    itemKind: itemKind.toString(),
    userItemList: items.map(writeUserItem),
  };
}
