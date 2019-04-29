// Quasi-nominative "brands". These double-underscore properties never actually
// exist at run time, we just pretend they do.

export type BackgroundCode = number & { __brand: "backgroundCode" };
export type ExtId<T> = number & { __extId: T };
export type TitleCode = number & { __brand: "titleCode" };
