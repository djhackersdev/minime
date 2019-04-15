// Quasi-nominative "brands". These double-underscore properties never actually
// exist at run time, we just pretend they do.

export type AimeId = number & { __brand: "aimeId" };
export type BackgroundCode = number & { __brand: "backgroundCode" };
export type Id<T> = number & { __id: T };
export type TitleCode = number & { __brand: "titleCode" };
