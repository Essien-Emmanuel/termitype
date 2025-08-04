export function topLevelSafeObject<T extends {}>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => value !== null)
  ) as T;
}

export type Fn = (...args: any[]) => any;

export function simplePluralize(len: number, word: string) {
  return len !== 1 ? word + "s" : word;
}

export async function tryAsync<T extends Fn>(
  fn: T,
  args?: unknown[]
): Promise<[Error, null] | [null, Awaited<ReturnType<T>>]> {
  try {
    // check function arguments
    const fnArg = simplePluralize(fn.length, "argument");
    if (fn.length && !args) {
      throw new TypeError(`Expected ${fn.length} ${fnArg} but received none`);
    }
    if (fn.length !== arguments.length - 1) {
      throw new TypeError(
        `Expected ${fn.length} ${fnArg} but received ${arguments.length - 1}`
      );
    }

    // await function call
    const result = args ? await fn(...args) : await fn();
    return [null, result];
  } catch (error: any) {
    const e = error instanceof Error ? error : new Error(String(error));
    return [e, null];
  }
}
function p(r: string) {
  return new Promise((resolve) => resolve(r));
}
const [e, d] = await tryAsync(p, ["r"]);
if (e) console.log(e);
else console.log(d);
