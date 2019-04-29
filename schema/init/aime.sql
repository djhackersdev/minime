create schema "aime";

create type "aime"."region" as enum (
    'JPN',
    'HKG',
    'SGP',
    'KOR',
    'USA'
);

create table "aime"."shop" (
    "id" bigint primary key not null,
    "ext_id" integer not null,
    "name" text not null,
    "region" "aime"."region" not null,
    constraint "shop_uq" unique ("ext_id")
);

create table "aime"."machine" (
    "id" bigint primary key not null,
    "shop_id" bigint not null
            references "aime"."shop"("id"),
    "pcb_id" text not null,
    "keychip_id" text not null,
    constraint "machine_pcb_id_uq" unique ("pcb_id"),
    constraint "machine_keychip_id_uq" unique ("keychip_id")
);

create table "aime"."player" (
    "id" bigint primary key not null,
    "ext_id" integer not null,
    "register_time" timestamp not null,
    constraint "player_uq" unique ("ext_id")
);

create table "aime"."card" (
    "id" bigint primary key not null,
    "player_id" bigint not null
            references "aime"."player"("id")
            on delete cascade,
    "nfc_id" text not null,
    "register_time" timestamp not null,
    "access_time" timestamp not null,
    constraint "card_uq" unique ("nfc_id")
);
