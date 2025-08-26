import { hideCursor, showCursor } from "@/core/io";

function resetWindowAndLoad(text: string) {
  process.stdout.write("\u001b[2K" + "\u001b[1G");

  process.stdout.write(text);
}

hideCursor();

let bar = "";
const interval = setInterval(() => {
  bar += "#";
  resetWindowAndLoad(bar);
}, 1000);

setTimeout(() => {
  clearInterval(interval);
  showCursor();
}, 6000);
