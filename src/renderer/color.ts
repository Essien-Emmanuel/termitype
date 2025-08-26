export function bold(char: string) {
  return `\x1b[1;37m${char}\x1b[0m`;
}

export function dim(char: string) {
  return `\x1b[2;37m${char}\x1b[0m`;
}

export function greenify(char: string) {
  return `\x1b[1;32m${char}\x1b[0m`;
}

export function redify(char: string) {
  return `\x1b[1;31m${char}\x1b[0m`;
}
