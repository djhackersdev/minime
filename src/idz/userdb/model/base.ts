// Quasi-nominative "brands". These double-underscore properties never actually
// exist at run time, we just pretend they do.

export type BackgroundCode = number & { __brand: "backgroundCode" };
export type CourseNo = number & { __brand: "courseNo" };
export type ExtId<T> = number & { __extId: T };
export type MyCharaCode = number & { __brand: "myCharaCode" };
export type RouteNo = number & { __brand: "routeNo" };
export type StampCode = number & { __brand: "stampCode" };
export type TitleCode = number & { __brand: "titleCode" };
