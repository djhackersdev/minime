create table "idz_my_chara" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "my_chara_no" integer not null,
    constraint "idz_my_chara_uq" unique ("profile_id", "my_chara_no")
);

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

create table "new_idz_story_cell_state" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "row_no" integer not null,
    "col_no" integer not null,
    "a" integer not null,
    "b" integer not null,
    "c" integer not null,
    constraint "idz_story_cell_state_uq" unique (
            "profile_id",
            "row_no",
            "col_no"
    )
);

create table "idz_weekly_missions" (
    "id" integer primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "weekly_reset" timestamp not null,
    "mission_left" integer not null,
    "progress_left" integer not null,
    "params_left" integer not null,
    "mission_right" integer not null,
    "progress_right" integer not null,
    "params_right" integer not null
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

insert into "new_idz_story_cell_state" (
    "id",
    "profile_id",
    "row_no",
    "col_no",
    "a",
    "b",
    "c"
) select
    x."id",
    x."profile_id",
    x."row_no",
    x."col_no",
    x."a",
    x."b",
    0
from "idz_story_cell_state" as x;

drop table "idz_settings";
drop table "idz_story_cell_state";

alter table "new_idz_settings" rename to "idz_settings";
alter table "new_idz_story_cell_state" rename to "idz_story_cell_state";
