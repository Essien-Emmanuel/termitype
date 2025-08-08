export const terminalWidth = process.stdout.columns || 80;

export function getTextMaxLength(texts: string[]) {
  const textLengths = texts.map((t) => t.length);
  const maxTextLen = Math.max.apply(null, textLengths);
  return maxTextLen;
}

export function validatePadLength(padLen: number, _texts?: string[]) {
  if (padLen) {
    if (!Number.isFinite(padLen)) {
      throw new TypeError("PadLength must be a finite number.");
    }

    if (padLen < 0) {
      throw new TypeError("PadLength must be a positive number");
    }
    // const maxTextLen = getTextMaxLength(texts);
    // const maxPadSize = terminalWidth - maxTextLen;
    // if (padLen > maxPadSize) {
    //   throw new TypeError(
    //     `PadLength for ${texts} exceeds Padding size(${maxPadSize}).`
    //   );
    // }
  }
}

export function logCenteredTest(text: string, pad: number) {
  process.stdout.write(" ".repeat(pad) + text + "\n");
}

export function textCenterRightPadding(texts: string[], padLen?: number) {
  const maxTextLen = getTextMaxLength(texts);

  if (padLen) {
    validatePadLength(padLen, texts);
  }

  texts.map((text) => {
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

export function textCenterLeftPadding(texts: string[], padLen?: number) {
  const maxTextLen = getTextMaxLength(texts);

  if (padLen) {
    validatePadLength(padLen, texts);
  }

  texts.map((text) => {
    let pad;
    if (padLen) {
      pad = padLen;
    } else {
      pad = Math.floor((terminalWidth - maxTextLen) / 2);
    }

    logCenteredTest(text, pad);
  });
}

export function textCenterAlign(texts: string[]) {
  texts.map((text) => {
    const pad = Math.round((terminalWidth - text.length) / 2);

    logCenteredTest(text, pad);
  });
}
