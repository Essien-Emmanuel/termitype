import type { InputKey } from "@/@types";

export function checkSpacebar(keypress: InputKey) {
  if (keypress !== "\u0020") {
    return false;
  }
  return true;
}

export function checkBackspace(keypress: InputKey) {
  if (keypress !== "\u0008") {
    return false;
  }
  return true;
}

export function checkEnter(keypress: InputKey) {
  if (keypress !== "\r") {
    return false;
  }
  return true;
}

export async function delay(ms: number = 3000) {
  await new Promise((resolve) => {
    setTimeout(() => {
      return resolve(null);
    }, ms);
  });
}
