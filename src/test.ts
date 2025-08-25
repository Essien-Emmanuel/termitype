export function resetWindow(_colCount: number = 1) {
  process.stdout.write("deleted");
  //   process.stdout.write("\u001b[2K" + `\u001b[${colCount}G`);
  //   process.stdout.write("\u001b[2K");
  // \u001b[2K = clear line
  // \u001b[1G = reset cursor to start of line
  process.stdout.write("\rIn lagos");
}

resetWindow();
