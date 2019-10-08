alter type "aime"."region" set schema "public";
alter type "region" rename to "aime_region";

alter table "aime"."shop" set schema "public";
alter table "shop" rename to "aime_shop";

alter table "aime"."machine" set schema "public";
alter table "machine" rename to "aime_machine";

alter table "aime"."player" set schema "public";
alter table "player" rename to "aime_player";

alter table "aime"."card" set schema "public";
alter table "card" rename to "aime_card";

----

alter type "idz"."gender" set schema "public";
alter type "gender" rename to "idz_gender";

alter table "idz"."profile" set schema "public";
alter table "profile" rename to "idz_profile";

alter table "idz"."chara" set schema "public";
alter table "chara" rename to "idz_chara";

alter table "idz"."course_plays" set schema "public";
alter table "course_plays" rename to "idz_course_plays";

alter table "idz"."car" set schema "public";
alter table "car" rename to "idz_car";

alter table "idz"."car_selection" set schema "public";
alter table "car_selection" rename to "idz_car_selection";

alter table "idz"."solo_mission_state" set schema "public";
alter table "solo_mission_state" rename to "idz_solo_mission_state";

alter table "idz"."settings" set schema "public";
alter table "settings" rename to "idz_settings";

alter table "idz"."story_state" set schema "public";
alter table "story_state" rename to "idz_story_state";

alter table "idz"."story_cell_state" set schema "public";
alter table "story_cell_state" rename to "idz_story_cell_state";

alter table "idz"."free_car" set schema "public";
alter table "free_car" rename to "idz_free_car";

alter table "idz"."ta_result" set schema "public";
alter table "ta_result" rename to "idz_ta_result";

alter table "idz"."ta_best" set schema "public";
alter table "ta_best" rename to "idz_ta_best";

alter table "idz"."background_unlock" set schema "public";
alter table "background_unlock" rename to "idz_background_unlock";

alter table "idz"."title_unlock" set schema "public";
alter table "title_unlock" rename to "idz_title_unlock";

alter table "idz"."unlocks" set schema "public";
alter table "unlocks" rename to "idz_unlocks";

alter table "idz"."team" set schema "public";
alter table "team" rename to "idz_team";

alter table "idz"."team_auto" set schema "public";
alter table "team_auto" rename to "idz_team_auto";

alter table "idz"."team_member" set schema "public";
alter table "team_member" rename to "idz_team_member";

alter table "idz"."team_reservation" set schema "public";
alter table "team_reservation" rename to "idz_team_reservation";

drop schema "idz";
drop schema "aime";

update "meta" set "schemaver" = 5;
