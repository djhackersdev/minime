-- Fun story: PostgreSQL (can't speak for other dbs) doesn't actually treat
-- its column and table names case-insensitively. It forces them to lower-
-- case instead. If you quote an upper-case field name then it will be upper-
-- case in the database and you will need to use quoted upper-case every time
-- you want to access it.

-- It is likely that people will find this behavior surprising, to say the
-- least. We'll change the column names so that they are always lower-case.

alter table "idz"."chara" rename column "field_0A" to "field_0a";
alter table "idz"."chara" rename column "field_0C" to "field_0c";
alter table "idz"."chara" rename column "field_0E" to "field_0e";

alter table "idz"."car" rename column "field_4A" to "field_4a";
alter table "idz"."car" rename column "field_4C" to "field_4c";
alter table "idz"."car" rename column "field_5A" to "field_5a";
alter table "idz"."car" rename column "field_5B" to "field_5b";
alter table "idz"."car" rename column "field_5C" to "field_5c";
alter table "idz"."car" rename column "field_5E" to "field_5e";

update "meta" set "schemaver" = 3;
