create table "aime_player" (
    "id" integer primary key not null,
    "ext_id" integer not null,
    "luid" text not null,
    "register_time" timestamp not null,
    "access_time" timestamp not null,
    constraint "aime_player_ext_id_uq" unique ("ext_id"),
    constraint "aime_player_luid_uq" unique ("luid")
);
