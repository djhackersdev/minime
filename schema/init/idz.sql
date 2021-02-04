-- Terminology:
-- A "course" contains an uphill and downhill "route"
-- (or inbound/outbound etc)

create table "idz_profile" (
    "id" integer primary key not null,
    "player_id" integer not null
            references "aime_player"("id")
            on delete cascade,
    -- Major version of Initial D Zero, either 1 or 2.
    -- The two major versions are incompatible with each other and do not
    -- permit the player to carry progress over from one to the other.
    "version" integer not null,
    -- TODO shop_id
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

create table "idz_chara" (
    "id" integer primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "gender" text not null,
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
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "course_no" integer not null,
    "count" integer not null,
    constraint "idz_course_plays_uq" unique ("profile_id", "course_no")
);

create table "idz_car" (
    "id" integer primary key not null,
    "profile_id" integer not null
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
    "id" integer primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "car_id" integer not null
            references "idz_car"("id")
            on delete cascade
);

create table "idz_solo_mission_state" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "grid_no" integer not null,
    "cell_no" integer not null,
    "value" integer not null,
    constraint "idz_solo_mission_state_uq" unique (
            "profile_id",
            "grid_no",
            "cell_no"
    )
);

create table "idz_settings" (
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

create table "idz_story_state" (
    "id" integer primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "x" integer not null,
    "y" integer not null
);

create table "idz_story_cell_state" (
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

create table "idz_free_car" (
    "id" integer primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "valid_from" timestamp not null
    -- Expiry cannot be controlled by the server
);

-- Times are stored as floating-point seconds

create table "idz_ta_result" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "route_no" integer not null,
    "total_time" float not null,
    "section_times" text not null,
    "flags" integer not null,
    "grade" integer not null,
    "car_selector" integer not null,
    "timestamp" timestamp not null
);

create table "idz_ta_best" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "route_no" integer not null,
    "total_time" float not null,
    "section_times" text not null,
    "flags" integer not null,
    "grade" integer not null, -- TODO enum
    "car_selector" integer not null,
    "timestamp" timestamp not null,
    constraint "idz_ta_best_uq" unique ("profile_id", "route_no")
);

-- TODO ta_section_best

create table "idz_background_unlock" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "background_no" integer not null,
    constraint "idz_background_unlock_uq" unique (
            "profile_id",
            "background_no"
    )
);

create table "idz_title_unlock" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "title_no" integer not null,
    constraint "idz_title_unlock_uq" unique ("profile_id", "title_no")
);

create table "idz_unlocks" (
    "id" integer primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "auras" integer not null,
    "cup" integer not null,
    "gauges" integer not null,
    "music" integer not null,
    "last_mileage_reward" integer not null
);

create table "idz_team" (
    "id" integer primary key not null,
    "version" integer not null,
    "ext_id" integer not null,
    "name" text not null,
    "name_bg" integer not null,
    "name_fx" integer not null,
    "register_time" timestamp not null,
    constraint "idz_team_uq" unique ("version", "ext_id")
);

create table "idz_team_auto" (
    "id" integer primary key not null
            references "idz_team"("id")
            on delete cascade,
    "serial_no" integer not null,
    "name_idx" integer not null
);

create table "idz_team_member" (
    "id" integer primary key not null
            references "idz_profile"("id")
            on delete cascade,
    "team_id" integer not null
            references "idz_team"("id")
            on delete cascade,
    "join_time" timestamp not null,
    "leader" boolean not null
);

create table "idz_team_reservation" (
    "id" integer primary key not null
            references "aime_player"("id")
            on delete cascade,
    "team_id" integer not null
            references "idz_team"("id")
            on delete cascade,
    "join_time" timestamp not null,
    "leader" boolean not null
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

create table "idz_my_chara" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "my_chara_no" integer not null,
    constraint "idz_my_chara_uq" unique ("profile_id", "my_chara_no")
);
