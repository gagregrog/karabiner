/** Include these entries only on the work machine. Spread the result. */
export function workOnly<T extends object>(entries: T): T {
  return IS_WORK ? entries : emptyLike(entries);
}

/** Include these entries only on the personal machine. Spread the result. */
export function personalOnly<T extends object>(entries: T): T {
  return IS_WORK ? emptyLike(entries) : entries;
}

/** Include these entries only on Apple Silicon. Spread the result. */
export function appleSiliconOnly<T extends object>(entries: T): T {
  return IS_APPLE_SILICON ? entries : emptyLike(entries);
}

export const IS_WORK = process.env.IS_WORK_MACHINE === "true";

export const IS_APPLE_SILICON = process.arch === "arm64";

/** Empty container matching the shape passed in, so `...` spreads to nothing. */
function emptyLike<T extends object>(entries: T): T {
  return (Array.isArray(entries) ? [] : {}) as T;
}
