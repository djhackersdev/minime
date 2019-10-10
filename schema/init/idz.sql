-- Terminology:
-- A "course" contains an uphill and downhill "route"
-- (or inbound/outbound etc)

create schema "idz";

create type "idz_gender" as enum ('male', 'female');

create table "idz_profile" (
    "id" bigint primary key not null,
    "player_id" bigint not null
            references "aime_player"("id")
            on delete cascade,
    -- TODO shop_id
    "name" text not null,
    "lv" smallint not null,
    "exp" integer not null,
    "fame" integer not null,
    "dpoint" integer not null,
    "mileage" integer not null,
    "register_time" timestamp not null,
    "access_time" timestamp not null,
    constraint "idz_profile_player_uq" unique ("player_id")
);

create table "idz_chara" (
    "id" bigint primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "gender" "idz_gender" not null,
    "field_02" integer not null,
    "field_04" integer not null,
    "field_06" integer not null,
    "field_08" integer not null,
    "field_0a" integer not null,
    "field_0c" integer not null,
    "field_0e" integer not null,
    "title" integer not null,
    "background" integer not null
);

create table "idz_course_plays" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz_profile"("id")
            on delete cascade,
    "course_no" smallint not null,
    "count" integer not null,
    constraint "idz_course_plays_uq" unique ("profile_id", "course_no")
);

create table "idz_car" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz_profile"("id")
            on delete cascade,
    "selector" integer not null,
    "field_00" integer not null,
    "field_02" integer not null,
    "field_04" text not null,
    "field_46" integer not null,
    "field_48" integer not null,
    "field_4a" integer not null,
    "field_4c" integer not null,
    "field_50_lo" integer not null,
    "field_50_hi" integer not null,
    "field_58" integer not null,
    "field_5a" integer not null,
    "field_5b" integer not null,
    "field_5c" integer not null,
    "field_5e" integer not null,
    constraint "idz_car_uq" unique ("profile_id", "selector")
);

create table "idz_car_selection" (
    "id" bigint primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "car_id" bigint not null
            references "idz_car"("id")
            on delete cascade
);

create table "idz_solo_mission_state" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz_profile"("id")
            on delete cascade,
    "grid_no" smallint not null,
    "cell_no" smallint not null,
    "value" smallint not null,
    constraint "idz_solo_mission_state_uq" unique (
            "profile_id",
            "grid_no",
            "cell_no"
    )
);

create table "idz_settings" (
    "id" bigint primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "music" smallint not null,
    "pack" bigint not null,
    "paper_cup" smallint not null, -- Not a boolean, oddly enough
    "gauges" integer not null
);

create table "idz_story_state" (
    "id" bigint primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "x" smallint not null,
    "y" smallint not null
);

create table "idz_story_cell_state" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz_profile"("id")
            on delete cascade,
    "row_no" integer not null,
    "col_no" integer not null,
    "a" smallint not null,
    "b" smallint not null,
    constraint "idz_story_cell_state_uq" unique (
            "profile_id",
            "row_no",
            "col_no"
    )
);

create table "idz_free_car" (
    "id" bigint primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "valid_from" timestamp not null
    -- Expiry cannot be controlled by the server
);

-- Times are stored as floating-point seconds

create table "idz_ta_result" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz_profile"("id")
            on delete cascade,
    "route_no" smallint not null,
    "total_time" float not null,
    "section_times" text not null,
    "flags" smallint not null,
    "grade" smallint not null,
    "car_selector" integer not null,
    "timestamp" timestamp not null
);

create table "idz_ta_best" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz_profile"("id")
            on delete cascade,
    "route_no" smallint not null,
    "total_time" float not null,
    "section_times" text not null,
    "flags" smallint not null,
    "grade" smallint not null, -- TODO enum
    "car_selector" integer not null,
    "timestamp" timestamp not null,
    constraint "idz_ta_best_uq" unique ("profile_id", "route_no")
);

-- TODO ta_section_best

create table "idz_background_unlock" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz_profile"("id")
            on delete cascade,
    "background_no" smallint not null,
    constraint "idz_background_unlock_uq" unique (
            "profile_id",
            "background_no"
    )
);

create table "idz_title_unlock" (
    "id" bigint primary key not null,
    "profile_id" bigint not null
            references "idz_profile"("id")
            on delete cascade,
    "title_no" smallint not null,
    constraint "idz_title_unlock_uq" unique ("profile_id", "title_no")
);

create table "idz_unlocks" (
    "id" bigint primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "cup" smallint not null,
    "gauges" integer not null,
    "music" integer not null,
    "last_mileage_reward" integer not null
);

create table "idz_team" (
    "id" bigint primary key not null,
    "ext_id" integer not null,
    "name" text not null,
    "name_bg" smallint not null,
    "name_fx" smallint not null,
    "register_time" timestamp not null,
    constraint "idz_team_uq" unique ("ext_id")
);

create table "idz_team_auto" (
    "id" bigint primary key not null
            references "idz_team"("id")
            on delete cascade,
    "serial_no" smallint not null,
    "name_idx" smallint not null,
    constraint "idz_team_auto_uq" unique ("serial_no", "name_idx")
);

create table "idz_team_member" (
    "id" bigint primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "team_id" bigint not null
            references "idz_team"("id")
            on delete cascade,
    "join_time" timestamp not null,
    "leader" boolean not null
);

create table "idz_team_reservation" (
    "id" bigint primary key not null
            references "aime_player"("id")
            on delete cascade,
    "team_id" bigint not null
            references "idz_team"("id")
            on delete cascade,
    "join_time" timestamp not null,
    "leader" boolean not null
);
