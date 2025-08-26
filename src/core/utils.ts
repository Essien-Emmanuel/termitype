import type { ApplyTextStyleConfig } from "@/@types";

export function applyTextStyle(config: ApplyTextStyleConfig) {
  const { styleFn, styleFnConfig, text } = config;
  const textArr = text.split("");

  return textArr.reduce((acc, curr) => {
    acc += styleFn({ font: curr, ...styleFnConfig });
    return acc;
  }, "");
}
