import { showCursor } from "../core/io.js";
function resetWindowAndLoad(text) {
    //   process.stdout.write(
    //     "\u001b[2K" + "\u001b[1G" + `\x1b[${process.stdout.rows};1H`
    //   );
    process.stdout.write("\x1b[1000D");
    process.stdout.write(text);
    showCursor();
}
// hideCursor();
console.log(process.stdout.rows);
console.log("Loading");
let bar = "";
const interval = setInterval(() => {
    bar += "#";
    resetWindowAndLoad(bar);
}, 1000);
setTimeout(() => {
    clearInterval(interval);
    //   showCursor();
}, 10000);
