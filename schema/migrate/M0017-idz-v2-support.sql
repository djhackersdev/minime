create table "new_idz_settings" (
    "id" integer primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "music" integer not null,
    "pack" integer not null,
    "aura" integer not null,
    "paper_cup" integer not null, -- Not a boolean, oddly enough
    "gauges" integer not null,
    "driving_style" integer not null
);

create table "idz_stamp_selections" (
    "id" integer primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "stamp_01" integer not null,
    "stamp_02" integer not null,
    "stamp_03" integer not null,
    "stamp_04" integer not null
);

create table "idz_stamp_unlock" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "stamp_no",
    constraint "idz_stamp_unlock_uq" unique ("profile_id", "stamp_no")
);

insert into "new_idz_settings" (
    "id",
    "music",
    "pack",
    "aura",
    "paper_cup",
    "gauges",
    "driving_style"
) select
    x."id",
    x."music",
    x."pack",
    x."aura",
    x."paper_cup",
    x."gauges",
    0
from "idz_settings" as x;

drop table "idz_settings";

alter table "new_idz_settings" rename to "idz_settings";
