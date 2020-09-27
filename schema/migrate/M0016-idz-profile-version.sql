create table "new_idz_profile" (
    "id" integer primary key not null,
    "player_id" integer not null
            references "aime_player"("id")
            on delete cascade,
    "version" integer not null,
    "name" text not null,
    "lv" integer not null,
    "exp" integer not null,
    "fame" integer not null,
    "dpoint" integer not null,
    "mileage" integer not null,
    "register_time" timestamp not null,
    "access_time" timestamp not null,
    constraint "idz_profile_player_uq" unique ("player_id", "version")
);

create table "new_idz_team" (
    "id" integer primary key not null,
    "version" integer not null,
    "ext_id" integer not null,
    "name" text not null,
    "name_bg" integer not null,
    "name_fx" integer not null,
    "register_time" timestamp not null,
    constraint "idz_team_uq" unique ("version", "ext_id")
);

insert into "new_idz_profile" (
    "id",
    "player_id",
    "version",
    "name",
    "lv",
    "exp",
    "fame",
    "dpoint",
    "mileage",
    "register_time",
    "access_time"
) select
    x."id",
    x."player_id",
    1,
    x."name",
    x."lv",
    x."exp",
    x."fame",
    x."dpoint",
    x."mileage",
    x."register_time",
    x."access_time"
from "idz_profile" as "x";

insert into "new_idz_team" (
    "id",
    "version",
    "ext_id",
    "name",
    "name_bg",
    "name_fx",
    "register_time"
) select
    x."id",
    1,
    x."ext_id",
    x."name",
    x."name_bg",
    x."name_fx",
    x."register_time"
from "idz_team" as "x";

drop table "idz_profile";
drop table "idz_team";

alter table "new_idz_profile" rename to "idz_profile";
alter table "new_idz_team" rename to "idz_team";
