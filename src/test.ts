const { stdin, stdout } = process;

function reloadWindow() {
  process.stdout.write("\x1b[1000D");
}

console.log("initializing");
function handleInput(handler: any) {
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

    reloadWindow();

    handler(key, storedKeypress, mistakeCorrectCount);
    --mistakeCorrectCount;
  });
}

function run() {
  handleInput(
    (input: string, storedKeypress: string, mistakeCorrectCount: number) => {
      // if (input === "\u232B") {
      //   console.log("back space");
      // }
      process.stdout.write(storedKeypress);
      if (storedKeypress === "attack") {
        console.log("hit");
      }
    }
  );
}

run();
// process.stdout.write("helao");
// process.stdout.write("hela\bo");
