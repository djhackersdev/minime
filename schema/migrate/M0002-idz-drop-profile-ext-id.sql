alter table "idz"."profile" drop column "ext_id";

update "meta" set "schemaver" = 1;
