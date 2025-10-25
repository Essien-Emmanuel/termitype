import fs from "fs";
import { write } from "./io.js";
import { options } from "./option.js";
export async function delay(ms = 3000) {
    await new Promise((resolve) => {
        setTimeout(() => {
            return resolve(null);
        }, ms);
    });
}
export function checkIsDirectory(fileName) {
    const fileStat = fs.lstatSync(`${fileName}`);
    return fileStat.isDirectory();
}
export function generateRandomIndex(iterLen) {
    return Math.floor(Math.random() * iterLen);
}
export function capitalizeString(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
export function handleTermninalArgs(opts) {
    if (!opts.length)
        return null;
    for (let opt of opts) {
        if (["--help", "-h"].includes(opt)) {
            write(options.help);
        }
    }
    return true;
}
