-- This was also not present in the db init scripts...
create table if not exists "cm_user_duel_list" (
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
