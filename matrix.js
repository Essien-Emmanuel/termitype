const { stdin } = process;
stdin.setRawMode(true);
stdin.setEncoding("utf-8");
stdin.setMaxListeners(0);

const randomlyColourise = (text, styleCodes, chance = 0.3) => {
  if (Math.random() > chance) return text;
  return `\x1b[2m\x1b[${styleCodes[0]}m${text}\x1b[22m`;
};

function createMatrix(groupSize = 8) {
  // const alphabet = "0123456789@#£_&-+()!?";
  const alphabet = "01";
  const columnCount = process.stdout.columns;
  const stringLength = groupSize * ~~(columnCount / (groupSize + 1));

  console.log(
    `\x1b[92m\x1b[1m${Array.from(
      { length: stringLength },
      () => alphabet[Math.floor(Math.random() * alphabet.length)]
    )
      .map((v, i) =>
        randomlyColourise(
          (i + 1) % groupSize === 0 ? v + " " : v,
          [32, 39],
          0.35
        )
      )
      .join("")}\x1b[22m\x1b[39m`
  );
}

const initTimer = 100;
function $setInterval(fn, timer) {
  let isKeyPress = false;

  setTimeout(() => {
    fn();
    if (isKeyPress) {
      timer -= 200;
    } else {
      timer = initTimer;
    }
    $setInterval(fn, timer);
  }, timer);

  stdin.on("data", (key) => {
    if (key === "\u0003") {
      process.exit();
    } else {
      isKeyPress = true;
    }
  });
}
$setInterval(createMatrix, initTimer);
