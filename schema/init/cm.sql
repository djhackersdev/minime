-- SQLite's ALTER TABLE statement is almost useless, and who knows how much of
-- this stuff is present in older versions. So while ideally we'd mark a lot
-- of these columns NOT NULL that might come back to bite us as we extend
-- support downward from Chunithm 4 to Chunithm 1.

create table "cm_user_data" (
    "id" integer primary key not null,
    -- Could in theory do a shared primary key with aime_player, since this
    -- is going to be a 1:1 relation for the foreseeable future, but again
    -- the SQLite strait-jacket forces us to design defensively.
    "player_id" integer not null
            references "aime_player"("id")
            on delete cascade,
    "access_code" text,
    "user_name" text,
    "is_web_join" text,
    "web_limit_date" text,
    "level" integer,
    "reincarnation_num" integer,
    "exp" integer,
    "point" integer,
    "total_point" integer,
    "play_count" integer,
    "multi_play_count" integer,
    "multi_win_count" integer,
    "request_res_count" integer,
    "accept_res_count" integer,
    "success_res_count" integer,
    "player_rating" integer,
    "highest_rating" integer,
    "nameplate_id" integer,
    "frame_id" integer,
    "character_id" integer,
    "trophy_id" integer,
    "played_tutorial_bit" integer,
    "first_tutorial_cancel_num" integer,
    "master_tutorial_cancel_num" integer,
    "total_repertoire_count" integer,
    "total_map_num" integer,
    "total_hi_score" integer,
    "total_basic_high_score" integer,
    "total_advanced_high_score" integer,
    "total_expert_high_score" integer,
    "total_master_high_score" integer,
    "event_watched_date" text,
    "friend_count" integer,
    "is_maimai" text,
    "first_game_id" text,
    "first_rom_version" text,
    "first_data_version" text,
    "first_play_date" text,
    "last_game_id" text,
    "last_rom_version" text,
    "last_data_version" text,
    "last_play_date" text,
    "last_place_id" integer,
    "last_place_name" text,
    "last_region_id" text,
    "last_region_name" text,
    "last_all_net_id" text,
    "last_client_id" text
);

create table "cm_user_activity" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "kind" integer not null,
    -- This is just called "id" on the wire but, well, we already have an "id"
    -- column up there ^
    "activity_id" integer not null,
    "sort_number" integer not null,
    "param1" integer not null,
    "param2" integer not null,
    "param3" integer not null,
    "param4" integer not null,
    constraint "cm_user_activity_uq" unique (
        "profile_id",
        "kind",
        "activity_id"
    )
);

create table "cm_user_charge" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "charge_id" integer not null,
    "stock" integer not null,
    "purchase_date" text not null,
    "valid_date" text not null,
    "param1" integer not null,
    "param2" integer not null,
    "param_date" text not null,
    constraint "cm_user_charge_uq" unique ("profile_id", "charge_id")
);

create table "cm_user_course" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "course_id" integer not null,
    "class_id" integer not null,
    "play_count" integer not null,
    "score_max" integer not null,
    "is_full_combo" text not null,
    "is_all_justice" text not null,
    "is_success" text not null,
    "score_rank" integer not null,
    "event_id" integer not null,
    "last_play_date" text not null,
    "param1" integer not null,
    "param2" integer not null,
    "param3" integer not null,
    "param4" integer not null,
    "is_clear" text not null,
    constraint "cm_user_course_uq" unique ("profile_id", "course_id")
);

create table "cm_user_data_ex" (
    "id" integer primary key not null
            references "cm_user_data"("id")
            on delete cascade,
    "compatible_cm_version" text not null,
    "medal" integer not null,
    "map_icon_id" integer not null,
    "voice_id" integer not null,
    "ext1" integer not null,
    "ext2" integer not null,
    "ext3" integer not null,
    "ext4" integer not null,
    "ext5" integer not null,
    "ext6" integer not null,
    "ext7" integer not null,
    "ext8" integer not null,
    "ext9" integer not null,
    "ext10" integer not null,
    "ext11" integer not null,
    "ext12" integer not null,
    "ext13" integer not null,
    "ext14" integer not null,
    "ext15" integer not null,
    "ext16" integer not null,
    "ext17" integer not null,
    "ext18" integer not null,
    "ext19" integer not null,
    "ext20" integer not null,
    "ext_str1" text not null,
    "ext_str2" text not null,
    "ext_str3" text not null,
    "ext_str4" text not null,
    "ext_str5" text not null,
    "ext_long1" integer not null,
    "ext_long2" integer not null,
    "ext_long3" integer not null,
    "ext_long4" integer not null,
    "ext_long5" integer not null
);

create table "cm_user_duel_list" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "duel_id" integer not null,
    "progress" integer not null,
    "point" integer not null,
    "is_clear" boolean not null,
    "last_play_date" text not null,
    "param1" integer not null,
    "param2" integer not null,
    "param3" integer not null,
    "param4" integer not null,
    constraint "cm_user_duel_list_uq" unique ("profile_id", "duel_id")
);

create table "cm_user_character" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "character_id" integer not null,
    "play_count" integer not null,
    "level" integer not null,
    "skill_id" integer not null,
    "friendship_exp" integer not null,
    "is_valid" integer not null,
    "is_new_mark" integer not null,
    "param1" integer not null,
    "param2" integer not null,
    constraint "cm_user_character_uq" unique ("profile_id", "character_id")
);

create table "cm_user_game_option" (
    "id" integer primary key not null
            references "cm_user_data"("id")
            on delete cascade,
    "bg_info" integer not null,
    "field_color" integer not null,
    "guide_sound" integer not null,
    "sound_effect" integer not null,
    "guide_line" integer not null,
    "speed" integer not null,
    "option_set" integer not null,
    "matching" integer not null,
    "judge_pos" integer not null,
    "rating" integer not null,
    "judge_justice" integer not null,
    "judge_attack" integer not null,
    "headphone" integer not null,
    "player_level" integer not null,
    "success_tap" integer not null,
    "success_ex_tap" integer not null,
    "success_slide_hold" integer not null,
    "success_air" integer not null,
    "success_flick" integer not null,
    "success_skill" integer not null,
    "success_tap_timbre" integer not null,
    "privacy" integer not null
);

create table "cm_user_game_option_ex" (
    "id" integer primary key not null
            references "cm_user_data"("id")
            on delete cascade,
    "ext1" integer not null,
    "ext2" integer not null,
    "ext3" integer not null,
    "ext4" integer not null,
    "ext5" integer not null,
    "ext6" integer not null,
    "ext7" integer not null,
    "ext8" integer not null,
    "ext9" integer not null,
    "ext10" integer not null,
    "ext11" integer not null,
    "ext12" integer not null,
    "ext13" integer not null,
    "ext14" integer not null,
    "ext15" integer not null,
    "ext16" integer not null,
    "ext17" integer not null,
    "ext18" integer not null,
    "ext19" integer not null,
    "ext20" integer not null
);

create table "cm_user_item" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "item_kind" integer not null,
    "item_id" integer not null,
    "stock" integer not null,
    "is_valid" text not null,
    constraint "cm_user_item_uq" unique ("profile_id", "item_kind", "item_id")
);

create table "cm_user_map" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "map_id" integer not null,
    "position" integer not null,
    "is_clear" text not null,
    "area_id" integer not null,
    "route_number" integer not null,
    "event_id" integer not null,
    "rate" integer not null,
    "status_count" integer not null,
    "is_valid" text not null,
    constraint "cm_user_map_uq" unique ("profile_id", "map_id")
);

create table "cm_user_music" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "music_id" integer not null,
    "level" integer not null,
    "play_count" integer not null,
    "score_max" integer not null,
    "res_request_count" integer not null,
    "res_accept_count" integer not null,
    "res_success_count" integer not null,
    "miss_count" integer not null,
    "max_combo_count" integer not null,
    "is_full_combo" text not null,
    "is_all_justice" text not null,
    "is_success" text not null,
    "full_chain" integer not null,
    "max_chain" integer not null,
    "score_rank" integer not null,
    "is_lock" text not null,
    constraint "cm_user_music_uq" unique ("profile_id", "music_id", "level")
);

create table "cm_user_playlog" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "order_id" integer not null,
    "sort_number" integer not null,
    "place_id" integer not null,
    "play_date" text not null,
    "user_play_date" text not null,
    "music_id" integer not null,
    "level" integer not null,
    "custom_id" integer not null,
    "played_user_id1" integer not null,
    "played_user_id2" integer not null,
    "played_user_id3" integer not null,
    "played_user_name1" text not null,
    "played_user_name2" text not null,
    "played_user_name3" text not null,
    "played_music_level1" integer not null,
    "played_music_level2" integer not null,
    "played_music_level3" integer not null,
    "played_custom1" integer not null,
    "played_custom2" integer not null,
    "played_custom3" integer not null,
    "track" integer not null,
    "score" integer not null,
    "rank" integer not null,
    "max_combo" integer not null,
    "max_chain" integer not null,
    "rate_tap" integer not null,
    "rate_hold" integer not null,
    "rate_slide" integer not null,
    "rate_air" integer not null,
    "rate_flick" integer not null,
    "judge_guilty" integer not null,
    "judge_attack" integer not null,
    "judge_justice" integer not null,
    "judge_critical" integer not null,
    "event_id" integer not null,
    "player_rating" integer not null,
    "is_new_record" text not null,
    "is_full_combo" text not null,
    "full_chain_kind" integer not null,
    "is_all_justice" text not null,
    "is_continue" text not null,
    "is_free_to_play" text not null,
    "character_id" integer not null,
    "skill_id" integer not null,
    "play_kind" integer not null,
    "is_clear" text not null,
    "skill_level" integer not null,
    "skill_effect" integer not null,
    "place_name" text not null,
    "is_maimai" text not null
);

create table "cm_user_recent_rating" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "sort_order" integer not null,
    "music_id" integer not null,
    "difficult_id" integer not null,
    "rom_version_code" integer not null,
    "score" integer not null,
    constraint "cm_user_recent_rating_uq" unique ("profile_id", "sort_order")
);
