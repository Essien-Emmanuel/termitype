export const ansiColorCodes = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  reset: 0,
} as const;

export type Color = keyof typeof ansiColorCodes;
