import fs from "fs";

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
