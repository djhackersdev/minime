-- Can't add NOT NULL or UNIQUE constraints as we'd like to. Fortunately we
-- haven't released anything yet so there aren't really any DBs with live
-- data out there in the wild.

-- (Can't drop and recreate the table either btw because "aime_player" is
-- transitively referenced by _literally everything_).

alter table "aime_player" add column "luid" text;
alter table "aime_player" add column "access_time" text;

update      "aime_player" as "p"
set         "luid" = (
                    select      "c"."nfc_id"
                    from        "aime_card" as "c"
                    where       "c"."player_id" = "p"."id"
            ),
            "access_time" = (
                    select      "c"."access_time"
                    from        "aime_card" as "c"
                    where       "c"."player_id" = "p"."id"
            );

drop table "aime_card";

-- These were never used. Re-create them if they become necessary.
drop table "aime_machine";
drop table "aime_shop";
