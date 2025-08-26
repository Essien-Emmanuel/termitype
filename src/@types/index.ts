export type UpdateTargetFontColorArg = {
  textPrompt: string;
  fontPos: number;
  match: boolean;
};

export type ApplyTextStyleArg = (char: string) => string;

export type HandlekeypressHandlerArg = {
  storedKeypress: string;
  keypress: string;
  keypressCount: number;
};

export type HandlekeypressHandler = (args: HandlekeypressHandlerArg) => void;

export type HandlekeypressOptions = { storeKeypress: boolean };
