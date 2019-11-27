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
