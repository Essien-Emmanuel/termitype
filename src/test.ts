import type { UpdateTargetFontColorArg } from "./@types";
import { styleFont } from "./renderer/font";

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

export function updateText({
  fontPos,
  match,
  textPrompt,
}: UpdateTargetFontColorArg) {
  const styledKeys = textPrompt.split(`\x1b`);
  const lastStyledFont = styledKeys[fontPos];
  // console.log(a);
  const font = lastStyledFont[lastStyledFont.length - 1];
  // console.log(a);

  const styledFont = match
    ? styleFont({ font, mode: "bold" })
    : styleFont({ font, color: "red" });

  styledKeys[fontPos] = styledFont;

  return styledKeys.join("\x1b");
}

const m = _updateText(t, 1, 32);
const n = _updateText(m, 2, 32);
const o = _updateText(n, 3, 32);
console.log(m);
console.log(n);
console.log(o);

const u = updateText({ textPrompt: t, fontPos: 1, match: true });
console.log(u);
const v = updateText({ textPrompt: u, fontPos: 1, match: true });
console.log(v);
console.log(updateText({ textPrompt: v, fontPos: 1, match: true }));
