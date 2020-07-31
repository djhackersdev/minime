create table if not exists "cm_user_recent_rating" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "sort_order" integer not null,
    "music_id" integer not null,
    "difficult_id" integer not null,
    "rom_version_code" integer not null,
    "score" integer not null,
    constraint "cm_user_recent_rating_uq" unique ("profile_id", "sort_order")
);

-- Prepopulate this table by backfilling the most recent 30 scores per user.
-- This isn't exactly correct since not every recent score should go in here, but it's probably close enough.
INSERT INTO cm_user_recent_rating (profile_id, sort_order, music_id, difficult_id, rom_version_code, score)
SELECT * FROM (
    SELECT
        profile_id,
        row_number()
            OVER (PARTITION BY profile_id ORDER BY user_play_date DESC) AS sort_order,
        music_id,
        level AS difficult_id,
        '1030000' AS rom_version_code,
    score
    FROM cm_user_playlog
    WHERE
        difficult_id < 4    -- skip world's end
    ORDER BY profile_id ASC, user_play_date DESC
)
WHERE sort_order <= 30;
