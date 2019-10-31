// Make the names explicit so that we don't get the order mixed up
interface Params {
  maxCount: number;
  nextIndex: number;
}

export function paginationCookie<T>(items: T[], params: Params) {
  if (items.length < params.maxCount) {
    return "-1";
  } else {
    return (params.nextIndex + params.maxCount).toString();
  }
}
