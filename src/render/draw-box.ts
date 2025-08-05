export default function drawBox(contents: string[], _options?: {}) {
  const rightBoarderPos = contents[0].length + 2;
  const horizontalBoarder = "+" + "-".repeat(rightBoarderPos) + "+";
  const veritcalBoarder = "| " + contents[0] + " |";
  console.log(horizontalBoarder);
  console.log(veritcalBoarder);
  console.log(horizontalBoarder);
  return;
}

drawBox(["game"]);
