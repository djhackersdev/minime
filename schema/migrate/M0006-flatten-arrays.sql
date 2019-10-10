alter table "idz_car" rename column "field_04" to "tmp";
alter table "idz_car" add column "field_04" text;
update "idz_car" set "field_04" = array_to_string("tmp", ',');
alter table "idz_car" alter column "field_04" set not null;
alter table "idz_car" drop column "tmp";

alter table "idz_ta_result" rename column "section_times" to "tmp";
alter table "idz_ta_result" add column "section_times" text;
update "idz_ta_result" set "section_times" = array_to_string("tmp", ',');
alter table "idz_ta_result" alter column "section_times" set not null;
alter table "idz_ta_result" drop column "tmp";

alter table "idz_ta_best" rename column "section_times" to "tmp";
alter table "idz_ta_best" add column "section_times" text;
update "idz_ta_best" set "section_times" = array_to_string("tmp", ',');
alter table "idz_ta_best" alter column "section_times" set not null;
alter table "idz_ta_best" drop column "tmp";

update "meta" set "schemaver" = 6;
