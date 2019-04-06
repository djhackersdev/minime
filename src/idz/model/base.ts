// Quasi-nominative "brands". These double-underscore properties never actually
// exist at run time, we just pretend they do.

export type Id<T> = number & { __id: T };
export type AimeId = number & { __brand: "aime_id" };
export type BackgroundCode = number & { __brand: "background_code" };
export type TitleCode = number & { __brand: "title_code" };
