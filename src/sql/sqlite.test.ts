import { Transaction } from "./api";
import { openSqlite } from "./sqlite";

async function violateFk(txn: Transaction) {
  await txn.raw("create table foo (id number primary key)");
  await txn.raw("create table bar (foo_id integer references foo(id))");
  await txn.raw("insert into bar (foo_id) values (1)");
}

test("FK enforcement", async () => {
  const db = openSqlite(":memory:");
  const promise = db.transaction(violateFk);

  expect(promise).rejects.toMatchObject({
    message: "FOREIGN KEY constraint failed",
  });
});

test("FK violation detection", async () => {
  const db = openSqlite(":memory:");
  const promise = db.maintenance(violateFk);

  expect(promise).rejects.toMatchObject({
    fkViolations: [
      {
        fkid: BigInt(0),
        parent: "foo",
        rowid: BigInt(1),
        table: "bar",
      },
    ],
  });
});
