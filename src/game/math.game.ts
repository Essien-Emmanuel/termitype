export function calculateWpm(
  keypressCount: number,
  uncorrectedErrorsCount: number,
  elapsedTime: number
) {
  const grossWpm = keypressCount / 5;
  const mins = 1000 * 60;
  const elapsedTimeInMin = elapsedTime / mins;

  const wpm = (grossWpm - uncorrectedErrorsCount) / elapsedTimeInMin;
  return Math.round(wpm);
}

export function calculateAccuracy(
  correctCharCount: number,
  totalPromptLength: number
) {
  return (correctCharCount / totalPromptLength) * 100;
}
