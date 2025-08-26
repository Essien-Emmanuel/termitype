export function green(char: string = "green") {
  return `\x1b[2;37m${char}\x1b[0m`;
}

const text = "this is a text";
export type ApplyTextStyleArg = (char: string) => string;

export function applyTextStyle(text: string, sytleFn: ApplyTextStyleArg) {
  const textArr = text.split("");
  return textArr.reduce((acc, curr) => {
    acc += sytleFn(curr);
    return acc;
  }, "");
}

const t = applyTextStyle(text, green);
console.log(t);
