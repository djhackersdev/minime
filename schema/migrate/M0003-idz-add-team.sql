create table "idz"."team" (
    "id" bigint primary key not null,
    "ext_id" integer not null,
    "name" text not null,
    "name_bg" smallint not null,
    "name_fx" smallint not null,
    "register_time" timestamp not null,
    constraint "team_uq" unique ("ext_id")
);

create table "idz"."team_auto" (
    "id" bigint primary key not null
            references "idz"."team"("id")
            on delete cascade,
    "serial_no" smallint not null,
    "name_idx" smallint not null,
    constraint "team_auto_uq" unique ("serial_no", "name_idx")
);

create table "idz"."team_member" (
    "id" bigint primary key not null
            references "idz"."profile"("id")
            on delete cascade,
    "team_id" bigint not null
            references "idz"."team"("id")
            on delete cascade,
    "join_time" timestamp not null,
    "leader" boolean not null
);

create table "idz"."team_reservation" (
    "id" bigint primary key not null
            references "aime"."player"("id")
            on delete cascade,
    "team_id" bigint not null
            references "idz"."team"("id")
            on delete cascade,
    "join_time" timestamp not null,
    "leader" boolean not null
);

update "meta" set "schemaver" = 2;
