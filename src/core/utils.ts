import fs from "fs";
import { write } from "./io";
import { options } from "./option";

export async function delay(ms: number = 3000) {
  await new Promise((resolve) => {
    setTimeout(() => {
      return resolve(null);
    }, ms);
  });
}

export function checkIsDirectory(fileName: string) {
  const fileStat = fs.lstatSync(`${fileName}`);
  return fileStat.isDirectory();
}

export function generateRandomIndex(iterLen: number) {
  return Math.floor(Math.random() * iterLen);
}

export function capitalizeString(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function handleTermninalArgs(opts: string[]) {
  if (!opts.length) return null;

  for (let opt of opts) {
    if (["--help", "-h"].includes(opt)) {
      write(options.help);
    }
  }

  return true;
}
