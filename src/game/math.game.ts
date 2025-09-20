export function calculateWpm(
  keypressCount: number,
  uncorrectedErrorsCount: number,
  elapsedTime: number
) {
  const grossWpm = keypressCount / 5;
  const mins = 1000 * 10;
  const elapsedTimeInMin = elapsedTime / mins;

  const wpm = (grossWpm - uncorrectedErrorsCount) / elapsedTimeInMin;
  return Math.max(Math.round(wpm), 0);
}

export function calculateAccuracy(
  correctCharCount: number,
  totalPromptLength: number
) {
  return (correctCharCount / totalPromptLength) * 100;
}
