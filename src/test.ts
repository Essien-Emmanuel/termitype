import type { UpdateTargetFontColorArg } from "./@types";
import { styleFont, styleFontReset } from "./renderer/font";

//const t = \x1b[1;33mH\x1b[1;34me\x1b[1;35ml\x1b[1;36ml\x1b[2;37mo\x1b[0m;
const t = `\x1b[2;37mH\x1b[2;37me\x1b[2;37ml\x1b[2;37ml\x1b[2;37mo\x1b[0m`;

export function _updateText(text: string, pos: number, colorCode: number) {
  const a = text.split(`\x1b`);
  // console.log(a);
  const font = a[pos][a[pos].length - 1];
  a[pos] = `[1;${colorCode}m${font}`;
  // console.log(a);

  return a.join("\x1b");
}
console.log(t);

// export function updateText({
//   fontPos,
//   match,
//   textPrompt,
// }: UpdateTargetFontColorArg) {
//   const styledKeys = textPrompt.split(`\x1b`);
//   const lastStyledFont = styledKeys[fontPos];
//   // console.log(a);
//   const font = lastStyledFont[lastStyledFont.length - 1];
//   // console.log(a);

//   const styledFont = match ? `[1;37m${font}` : `[1;31m${font}`;

//   styledKeys[fontPos] = styledFont;

//   return styledKeys.join("\x1b");
// }

// const m = updateText(t, 1, 32);
// const n = updateText(m, 2, 32);
// const o = updateText(n, 3, 32);

export function updateText({
  fontPos,
  match,
  textPrompt,
}: UpdateTargetFontColorArg) {
  const styledKeys = textPrompt.split(`\x1b`);
  const lastStyledFont = styledKeys[fontPos];

  const font = lastStyledFont[lastStyledFont.length - 1];

  const styledFont = match
    ? styleFont({ font, mode: "bold" }).split("\x1b").slice(1).join("\x1b")
    : styleFont({ font, color: "red" }).split("\x1b").slice(1).join("\x1b");

  styledKeys[fontPos] = styledFont;

  return styledKeys.join(`\x1b`) + styleFontReset;
}
const u = updateText({ textPrompt: t, fontPos: 1, match: true });
const v = updateText({ textPrompt: u, fontPos: 2, match: true });
console.log(u);
console.log(v);
console.log(
  updateText({ textPrompt: v, fontPos: 3, match: true }) +
);
