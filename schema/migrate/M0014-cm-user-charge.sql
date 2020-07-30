create table if not exists "cm_user_charge" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "cm_user_data"("id")
            on delete cascade,
    "charge_id" integer not null,
    "stock" integer not null,
    "purchase_date" text not null,
    "valid_date" text not null,
    "param1" integer not null,
    "param2" integer not null,
    "param_date" text not null,
    constraint "cm_user_charge_uq" unique ("profile_id", "charge_id")
);
