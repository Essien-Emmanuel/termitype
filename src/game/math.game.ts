export function calculateWpm(
  keypressCount: number,
  accuracy: number,
  elapsedTime: number
) {
  const wordPerKeypress = keypressCount / 5;
  const oneMin = 1000 * 60;
  const elapsedTimeInMin = elapsedTime / oneMin;

  if (elapsedTimeInMin <= 0) return 0;

  const grossWpm = wordPerKeypress / elapsedTimeInMin;

  const netWpm = grossWpm * accuracy;
  return Math.max(Math.round(netWpm), 0);
}

export function calculateAccuracy(
  correctCharCount: number,
  totalPromptLength: number
) {
  return correctCharCount / totalPromptLength;
}
