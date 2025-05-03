export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
