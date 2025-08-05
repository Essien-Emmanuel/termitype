const terminalWidth = process.stdout.columns || 80;

function getTextMaxLength(texts) {
  const textLengths = texts.map(t => t.length);
  const maxTextLen = Math.max.apply(null, textLengths);
  return maxTextLen;
}

function validatePadLength(texts, padLen) {
  const maxTextLen = getTextMaxLength(texts);
  if (padLen) {
    if (!Number.isFinite(padLen)) {
      throw new TypeError("PadLength must be a finite number.");
    }

    if (padLen < 0) {
      throw new TypeError("PadLength must be a positive number");
    }
    const maxPadSize = terminalWidth - maxTextLen;
    if (padLen > maxPadSize) {
      throw new TypeError(
        `PadLength for ${texts} exceeds Padding size(${maxPadSize}).`
      );
    }
  }
}

function logCenteredTest(text, pad) {
  process.stdout.write(" ".repeat(pad) + text + "\n");
}

function textCenterRightPadding(texts, padLen) {
  const maxTextLen = getTextMaxLength(texts);

  if (padLen) {
    validatePadLength(texts, padLen);
  }

  texts.map(text => {
    let pad;
    if (padLen) {
      pad = padLen;
    } else {
      pad = Math.floor((terminalWidth - maxTextLen) / 2);
    }

    if (text.length !== maxTextLen) {
      pad = pad + maxTextLen - text.length;
    }

    logCenteredTest(text, pad);
  });
}

function textCenterLeftPadding(texts, padLen) {
  const maxTextLen = getTextMaxLength(texts);

  if (padLen) {
    validatePadLength(texts, padLen);
  }

  texts.map(text => {
    let pad;
    if (padLen) {
      pad = padLen;
    } else {
      pad = Math.floor((terminalWidth - maxTextLen) / 2);
    }

    logCenteredTest(text, pad);
  });
}

function textCenterAlign(texts) {
  texts.map(text => {
    const pad = Math.round((terminalWidth - text.length) / 2);

    logCenteredTest(text, pad);
  });
}

function centerText($texts, options) {
  const texts = $texts.map(t => (typeof t !== "string" ? String(t) : t));

  if (!Array.isArray(texts)) {
    throw new TypeError(
      `Expected first  argument to be an array but received ${typeof texts}.`
    );
  }

  if (options && "padding" in options) {
    const padLen = options["padLength"];
    switch (options["padding"]) {
      case "right":
        textCenterRightPadding(texts, padLen);
        break;
      case "left":
        textCenterLeftPadding(texts, padLen);
        break;
      default:
        textCenterAlign(texts);
        break;
    }
  } else {
    console;
    textCenterAlign(texts);
  }
}
// centerText(["over", "gamestate", "car", "game", "title", "prologue"], {
//   padding: "right"
//   // padLength: 20
// });

module.exports = {
  centerText,
  getTextMaxLength,
  textCenterAlign,
  textCenterLeftPadding,
  textCenterRightPadding,logCenteredTest,validatePadLength,
  terminalWidth
  
}

