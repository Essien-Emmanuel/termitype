const { stdin, stdout } = process;

function handleInput(handler: any) {
  stdin.removeAllListeners("data");
  stdin.setRawMode(true);
  stdin.setEncoding("utf-8");

  let storedKeypress = "";

  const timer = setTimeout(() => {
    console.log("timeout");
    clearTimeout(timer);
    handler(storedKeypress);
    process.removeAllListeners("data");
  }, 1000);

  stdin.on("data", (key: string) => {
    storedKeypress += key;

    if (key === "\u0003") {
      process.exit();
    }

    handler(storedKeypress, storedKeypress);
  });
}

function run() {
  handleInput((input: string, storedKeypress: string) => {
    if (storedKeypress === "attack") {
      console.log("hit");
    }
  });
}

run();
