-- This adds the required columns to save player aura settings and unlocks
-- Default values are set according to what the game expects

alter table "idz_settings" add column "aura" integer NOT NULL DEFAULT '0';
alter table "idz_unlocks" add column "auras" integer NOT NULL DEFAULT '1';