import sql from "sql-bricks-postgres";

import { CardRepository, Repositories } from "./repo";
import { AimeId, generateExtId } from "../model";
import { Transaction } from "../sql";

class CardRepositoryImpl implements CardRepository {
  constructor(private readonly _txn: Transaction) {}

  async lookup(luid: string, now: Date): Promise<AimeId | undefined> {
    const fetchSql = sql
      .select("p.id", "p.ext_id")
      .from("aime_player p")
      .where("p.luid", luid);

    const row = await this._txn.fetchRow(fetchSql);

    if (row === undefined) {
      return undefined;
    }

    const id = row.id!;
    const extId = row.ext_id!;

    const touchSql = sql
      .update("aime_player")
      .set({ access_time: now })
      .where("id", id);

    await this._txn.modify(touchSql);

    return parseInt(extId, 10) as AimeId;
  }

  async register(luid: string, now: Date): Promise<AimeId> {
    const id = this._txn.generateId();
    const aimeId = generateExtId() as AimeId;

    const insertSql = sql.insert("aime_player", {
      id: id,
      ext_id: aimeId,
      luid: luid,
      register_time: now,
      access_time: now,
    });

    await this._txn.modify(insertSql);

    return aimeId;
  }
}

export class SqlRepositories implements Repositories {
  constructor(private readonly _txn: Transaction) {}

  cards(): CardRepository {
    return new CardRepositoryImpl(this._txn);
  }
}
