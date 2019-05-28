-- Helper functions which might be useful in one-off queries.
-- These are not utilised by any services; those have their own ID generators.

create or replace function idnum(
    str         text)
    returns     bigint as $$
declare
    num         bigint;
    x           integer;
begin
    num := 0;

    for i in 1..11 loop
        x := ascii(substr(str, i, 1));
        num := num << 6;

        if x >= 65 and x <= 90 then
            -- A to Z
            num = num | (x - 65);
        elsif x >= 97 and x <= 122 then
            -- a to z
            num = num | (x - 71);
        elsif x >= 48 and x <= 58 then
            -- 0 to 9
            num = num | (x + 4);
        elsif x = 45 then
            -- Dash
            num = num | 62;
        elsif x = 95 then
            -- Underscore
            num = num | 63;
        else
            raise 'Bad input';
        end if;
    end loop;

    return num;
end;
$$ language plpgsql;

create or replace function idstr(
    num         bigint)
    returns     text as $$
declare
    a           text;
    pos         integer;
    str         text;
begin
    a := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    str := '';

    for i in 1..11 loop
        pos := (num & 63);
        str := substr(a, pos + 1, 1) || str;
        num := num >> 6;
    end loop;

    return str;
end;
$$ language plpgsql;

create or replace function newid()
    returns     bigint as $$
declare
    bytes       bytea;
    result      bigint;
begin
    bytes := gen_random_bytes(8);
    result := 0;

    for i in 0..7 loop
        result := (result << 8) | get_byte(bytes, i);
    end loop;

    -- Truncate high bit to ensure result is positive
    -- This value is just the decimal representation of 0x7FFFFFFF`FFFFFFFF.

    return result & 9223372036854775807;
end;
$$ language plpgsql;

