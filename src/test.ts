const { stdin, stdout } = process;

function reloadWindow(lines: number = 2) {
  process.stdout.write(`\x1b[${process.stdout.rows - lines};0H\x1b[1000D`);
  // process.stdout.write("\x1b[1000D\x1b[2A");
  // process.stdout.write(`\x1b[s`);
}

console.log("initializing");
function handleInput(handler: any, textPromptRows: number) {
  stdin.removeAllListeners("data");
  stdin.setRawMode(true);
  stdin.setEncoding("utf-8");

  let storedKeypress = "";
  let mistakeCorrectCount = 0;
  let keypressCount = 0;

  stdin.on("data", (key: string) => {
    storedKeypress += key;

    if (key === "\u0003") {
      process.exit();
    }

    if (key === "\u0008") {
      console.log("back space");
    }

    ++keypressCount;

    reloadWindow(2);

    handler(key, storedKeypress, mistakeCorrectCount);
    --mistakeCorrectCount;
  });
}
console.log(process.stdout.columns);

function run() {
  const textPrompt =
    "To keep the width at 300px, no matter the amount of padding, you can use the box-sizing property This causes the element to maintain its actual width; if you increase the padding, the available content space will decrease.";
  const textPromptRows = Math.ceil(textPrompt.length / 156);
  let cursorpos = 0;
  handleInput(
    (input: string, storedKeypress: string, mistakeCorrectCount: number) => {
      process.stdout.write(textPrompt);
      process.stdout.write(`\x1b[8;${2}f`);
      if (storedKeypress === "attack") {
        console.log("hit");
      }
    },
    textPromptRows
  );
}

run();
console.log(process.stdout.rows);
// process.stdout.write("helao");
// process.stdout.write("hela\bo");
