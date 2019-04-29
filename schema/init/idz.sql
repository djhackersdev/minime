-- Terminology:
-- A "course" contains an uphill and downhill "route"
-- (or inbound/outbound etc)

create schema "idz";

create type "idz"."gender" as enum ('male', 'female');

create table "idz"."profile" (
    "id" bigint primary key not null,
    "player_id" bigint not null
            references "aime"."player"("id")
            on delete cascade,
    -- TODO shop_id
    "ext_id" integer not null,
    "name" text not null,
    "lv" smallint not null,
    "exp" integer not null,
    "fame" integer not null,
    "dpoint" integer not null,
    "mileage" integer not null,
    "register_time" timestamp not null,
    "access_time" timestamp not null,
    constraint "profile_player_uq" unique ("player_id"),
    constraint "profile_ext_id_uq" unique ("ext_id")
);

create table "idz"."chara" (
    "id" bigint primary key not null
            references "idz"."profile"("id")
            on delete cascade,
    "gender" "idz"."gender" not null,
    "field_02" integer not null,
    "field_04" integer not null,
    "field_06" integer not null,
    "field_08" integer not null,
    "field_0A" integer not null,
    "field_0C" integer not null,
    "field_0E" integer not null,
    "title" integer not null,
    "background" integer not null
);

create table "idz"."course_plays" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz"."profile"("id")
            on delete cascade,
    "course_no" smallint not null,
    "count" integer not null,
    constraint "course_plays_uq" unique ("profile_id", "course_no")
);

create table "idz"."car" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz"."profile"("id")
            on delete cascade,
    "selector" integer not null,
    "field_00" integer not null,
    "field_02" integer not null,
    "field_04" integer[] not null,
    "field_46" integer not null,
    "field_48" integer not null,
    "field_4A" integer not null,
    "field_4C" integer not null,
    "field_50_lo" integer not null,
    "field_50_hi" integer not null,
    "field_58" integer not null,
    "field_5A" integer not null,
    "field_5B" integer not null,
    "field_5C" integer not null,
    "field_5E" integer not null,
    constraint "car_uq" unique ("profile_id", "selector")
);

create table "idz"."car_selection" (
    "id" bigint primary key not null
            references "idz"."profile"("id")
            on delete cascade,
    "car_id" bigint not null
            references "idz"."car"("id")
            on delete cascade
);

create table "idz"."solo_mission_state" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz"."profile"("id")
            on delete cascade,
    "grid_no" smallint not null,
    "cell_no" smallint not null,
    "value" smallint not null,
    constraint "solo_mission_state_uq" unique ("profile_id", "grid_no", "cell_no")
);

create table "idz"."settings" (
    "id" bigint primary key not null
            references "idz"."profile"("id")
            on delete cascade,
    "music" smallint not null,
    "pack" integer not null,
    "paper_cup" smallint not null, -- Not a boolean, oddly enough
    "gauges" integer not null
);

create table "idz"."story_state" (
    "id" bigint primary key not null
            references "idz"."profile"("id")
            on delete cascade,
    "x" smallint not null,
    "y" smallint not null
);

create table "idz"."story_cell_state" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz"."profile"("id")
            on delete cascade,
    "row_no" integer not null,
    "col_no" integer not null,
    "a" smallint not null,
    "b" smallint not null,
    constraint story_cell_state_uq unique ("profile_id", "row_no", "col_no")
);

create table "idz"."free_car" (
    "id" bigint primary key not null
            references "idz"."profile"("id")
            on delete cascade,
    "valid_from" timestamp not null
    -- Expiry cannot be controlled by the server
);

-- Times are stored as floating-point seconds

create table "idz"."ta_result" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz"."profile"("id")
            on delete cascade,
    "route_no" smallint not null,
    "total_time" float not null,
    "section_times" float[] not null,
    "flags" smallint not null,
    "grade" smallint not null,
    "car_selector" integer not null,
    "timestamp" timestamp not null
);

create table "idz"."ta_best" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz"."profile"("id")
            on delete cascade,
    "route_no" smallint not null,
    "total_time" float not null,
    "section_times" float[] not null,
    "flags" smallint not null,
    "grade" smallint not null, -- TODO enum
    "car_selector" integer not null,
    "timestamp" timestamp not null,
    constraint "ta_best_uq" unique ("profile_id", "route_no")
);

-- TODO ta_section_best

create table "idz"."background_unlock" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz"."profile"("id")
            on delete cascade,
    "background_no" smallint not null,
    constraint "background_unlock_uq" unique ("profile_id", "background_no")
);

create table "idz"."title_unlock" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz"."profile"("id")
            on delete cascade,
    "title_no" smallint not null,
    constraint "title_unlock_uq" unique ("profile_id", "title_no")
);

create table "idz"."unlocks" (
    "id" bigint primary key not null
            references "idz"."profile"("id")
            on delete cascade,
    "cup" smallint not null,
    "gauges" integer not null,
    "music" integer not null,
    "last_mileage_reward" integer not null
);
