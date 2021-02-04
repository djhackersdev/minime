create table "new_idz_team_auto" (
    "id" integer primary key not null
            references "idz_team"("id")
            on delete cascade,
    "serial_no" integer not null,
    "name_idx" integer not null
);

insert into "new_idz_team_auto"
select "id", "serial_no", "name_idx" from "idz_team_auto";

drop table "idz_team_auto";
alter table "new_idz_team_auto" rename to "idz_team_auto";
