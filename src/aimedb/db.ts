import sql from "sql-bricks-postgres";

import { CardRepository, Repositories } from "./repo";
import { AimeId, generateExtId } from "../model";
import { Transaction, generateId } from "../sql";

class CardRepositoryImpl implements CardRepository {
  constructor(private readonly _txn: Transaction) {}

  async lookup(luid: string, now: Date): Promise<AimeId | undefined> {
    const fetchSql = sql
      .select("c.id", "p.ext_id")
      .from("aime_card c")
      .join("aime_player p", { "c.player_id": "p.id" })
      .where("c.nfc_id", luid);

    const row = await this._txn.fetchRow(fetchSql);

    if (row === undefined) {
      return undefined;
    }

    const id = row.id;
    const extId = row.ext_id;

    const touchSql = sql
      .update("aime_card")
      .set({ access_time: now })
      .where("id", id);

    await this._txn.modify(touchSql);

    return parseInt(extId, 10) as AimeId;
  }

  async register(luid: string, now: Date): Promise<AimeId> {
    const playerId = generateId();
    const cardId = generateId();
    const aimeId = generateExtId() as AimeId;

    const playerSql = sql.insert("aime_player", {
      id: playerId,
      ext_id: aimeId,
      register_time: now,
    });

    await this._txn.modify(playerSql);

    const cardSql = sql.insert("aime_card", {
      id: cardId,
      player_id: playerId,
      nfc_id: luid,
      register_time: now,
      access_time: now,
    });

    await this._txn.modify(cardSql);

    return aimeId;
  }
}

export class SqlRepositories implements Repositories {
  constructor(private readonly _txn: Transaction) {}

  cards(): CardRepository {
    return new CardRepositoryImpl(this._txn);
  }
}
