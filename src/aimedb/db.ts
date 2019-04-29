import { PoolClient } from "pg";
import * as sql from "sql-bricks";

import { CardRepository, Transaction } from "./repo";
import { connect, generateId, generateExtId } from "../db";
import { AimeId } from "../model";

class CardRepositoryImpl implements CardRepository {
  constructor(private readonly _conn: PoolClient) {}

  async lookup(luid: string, now: Date): Promise<AimeId | undefined> {
    const fetchSql = sql
      .select("c.id", "p.ext_id")
      .from("aime.card c")
      .join("aime.player p", { "c.player_id": "p.id" })
      .where("c.nfc_id", luid)
      .toParams();

    const { rows } = await this._conn.query(fetchSql);

    if (rows.length === 0) {
      return undefined;
    }

    const id = rows[0].id;
    const extId = rows[0].ext_id;

    const touchSql = sql
      .update("aime.card")
      .set({ access_time: now })
      .where("id", id)
      .toParams();

    await this._conn.query(touchSql);

    return extId;
  }

  async register(luid: string, now: Date): Promise<AimeId> {
    const playerId = generateId();
    const cardId = generateId();
    const aimeId = generateExtId() as AimeId;

    const playerSql = sql
      .insert("aime.player", {
        id: playerId,
        ext_id: aimeId,
        register_time: now,
      })
      .toParams();

    await this._conn.query(playerSql);

    const cardSql = sql
      .insert("aime.card", {
        id: cardId,
        player_id: playerId,
        nfc_id: luid,
        register_time: now,
        access_time: now,
      })
      .toParams();

    await this._conn.query(cardSql);

    return aimeId;
  }
}

class TransactionImpl implements Transaction {
  constructor(private readonly _conn: PoolClient) {}

  cards(): CardRepository {
    return new CardRepositoryImpl(this._conn);
  }

  async commit(): Promise<void> {
    await this._conn.query("commit");
    await this._conn.release();
  }

  async rollback(): Promise<void> {
    await this._conn.query("rollback");
    await this._conn.release();
  }
}

export async function beginDbSession(): Promise<Transaction> {
  const conn = await connect();

  await conn.query("begin");

  return new TransactionImpl(conn);
}
