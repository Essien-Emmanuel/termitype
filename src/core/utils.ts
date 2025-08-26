import type { ApplyTextStyleArg } from "@/@types";

export function applyTextStyle(text: string, sytleFn: ApplyTextStyleArg) {
  const textArr = text.split("");
  return textArr.reduce((acc, curr) => {
    acc += sytleFn(curr);
    return acc;
  }, "");
}
