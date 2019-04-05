// Quasi-nominative typing "brands".
// The double-underscore properties never actually exist at runtime, we just
// pretend they do.

export type RequestCode = number & { __requestId: null };
