function hk(cb) {
  process.stdin.removeAllListeners("data");
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);

  process.stdin.on("data", (key) => cb(key));
}

const target = "this is just a test";

const words = target.split(" ");
const tfWords = words.map((w) => {
  return {
    word: w,
    len: w.length,
    typed: "",
    corrected: false,
  };
});

/**
 * Map word data to the position just after the word. more like position
 * and not index:
 *  So word 'this' is mapped to {5: {word: 'this'}} instead of {4: {word: 'this}}
 */
export function createAfterWordMap(prompt) {
  const afterWordMap = {};
  let spacePos = 0;
  let charCount = 0;
  let word = "";

  for (const char of prompt) {
    ++charCount;
    ++spacePos;
    word += char;
    if (char === " ") {
      afterWordMap[spacePos] = {
        word,
        len: charCount - 1, // -1 to account for the space
        typed: "",
        visited: false,
        corrected: false,
      };
      charCount = 0;
      word = "";
    }

    if (prompt.length === spacePos) {
      afterWordMap[spacePos] = {
        word,
        len: charCount,
        typed: "",
        visited: false,
        corrected: false,
      };
    }
  }
  return afterWordMap;
}

function checkWord() {
  const afterWordMap = createAfterWordMap(target);
  const wordsP = Object.keys(afterWordMap);
  let wordInd = 0;
  let storedWord = "";
  let keyCount = 0;
  let isBackspace = false;
  hk((key) => {
    if (key === "\u0003") {
      process.exit();
    }

    if (key === "\u0008") {
      isBackspace = true;

      if (wordInd > 0 && keyCount <= wordsP[wordInd - 1]) {
        --wordInd;
        const currWordKey = wordsP[wordInd];
        const wordData = afterWordMap[currWordKey].typed;
        storedWord = wordData.slice(0, -1);
      }
      keyCount = Math.max(--keyCount, 0);
      storedWord = storedWord.slice(0, -1);
    } else {
      isBackspace = false;
      keyCount = Math.min(++keyCount, target.length);
      storedWord += key;
      if (keyCount > wordsP[wordInd]) {
        ++wordInd;
      }
    }

    if (keyCount in afterWordMap && !isBackspace) {
      afterWordMap[keyCount].typed = storedWord;
      if (!afterWordMap[keyCount].visited) {
        afterWordMap[keyCount].visited = true;
      } else {
        afterWordMap[keyCount].corrected = true;
      }
      storedWord = "";
    }

    if (keyCount === target.length) {
      const wordMapValues = Object.values(afterWordMap);
      const uncorrectedWordCount = wordMapValues.reduce((acc, curr) => {
        if (!curr.corrected && curr.word !== curr.typed) {
          ++acc;
        }
        return acc;
      }, 0);
      console.log({ uncorrectedWordCount });
    }
  });
}
checkWord();
