import * as sql from "sql-bricks";
import { Client } from "pg";

import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Id } from "../../db";

export async function _findProfile(
  conn: Client,
  extId: ExtId<Profile>
): Promise<Id<Profile> | undefined> {
  const lookupSql = sql
    .select("r.id")
    .from("idz.profile r")
    .where("r.ext_id", extId)
    .toParams();

  const { rows } = await conn.query(lookupSql);

  if (rows.length > 0) {
    return rows[0].id as Id<Profile>;
  } else {
    throw new Error("Profile not found");
  }
}
