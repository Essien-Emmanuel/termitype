export function topLevelSafeObject<T extends {}>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => value !== null)
  ) as T;
}

export type Fn = (...args: any[]) => any;

export async function tryAsync<T extends Fn>(
  fn: T,
  args: unknown[]
): Promise<[Error, null] | [null, Awaited<ReturnType<T>>]> {
  try {
    const result = await fn(...args);
    return [null, result];
  } catch (error: any) {
    const e = error instanceof Error ? error : new Error(String(error));
    return [e, null];
  }
}
