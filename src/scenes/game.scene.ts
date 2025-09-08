import type { InputKey } from "@/@types";
import {
  clearEntireScreen,
  moveDownBy,
  positionTerminalCursor,
  resetTerminalWindow,
  setCursorPos,
  showCursor,
  write,
} from "@/core/io";
import { checkBackspace, checkEnter, delay } from "@/core/utils";
import { initializeGame } from "@/game/init";
import { calculateAccuracy, calculateWpm } from "@/game/math.game";
import {
  matchKeypressToTextPromt,
  updateStyledTextPrompt,
  writeToFile,
} from "@/game/utils.game";

export class GameScene {
  public keypress: InputKey;
  public storedKeypress: string;
  public keypressCount: number;
  public correctCharCount: number;
  public prevTime: number;
  public textPromptRows: number;
  public promptCharPos: number;
  public timeout: number;
  public mistakes: number;
  public textPromptLength: number;
  public textPrompt: string;
  public styledTextPrompt: string;
  public isBackspaceKeypress: boolean;

  constructor() {
    this.keypress = "";
    this.storedKeypress = "";
    this.styledTextPrompt = "";
    this.textPrompt = "";
    this.textPromptRows = 0;
    this.keypressCount = 0;
    this.promptCharPos = 0;
    this.correctCharCount = 0;
    this.textPromptLength = 0;
    this.mistakes = 0;
    this.prevTime = 0;
    this.timeout = 0;
    this.isBackspaceKeypress = false;
  }

  async init() {
    clearEntireScreen();
    // set cursor position
    moveDownBy(1);

    console.log("initializing game...");

    delay();
    clearEntireScreen();
    moveDownBy(1);

    const { styledTextPrompt, textPromptRows, textPromptLength, textPrompt } =
      await initializeGame();

    this.prevTime = Date.now();
    this.styledTextPrompt = styledTextPrompt;
    this.textPromptLength = textPromptLength;
    this.textPromptRows = textPromptRows;
    this.textPrompt = textPrompt;
    this.timeout = 1000 * 30;
  }

  async update($key: InputKey): Promise<{ nextScene: string }> {
    let key = $key;

    this.storedKeypress += key;
    this.keypress = key;
    ++this.keypressCount;
    this.isBackspaceKeypress = false;

    if (checkBackspace(key)) {
      this.isBackspaceKeypress = true;
    }

    if (checkEnter(key)) {
      setCursorPos(this.promptCharPos);
      return { nextScene: "" };
    }

    resetTerminalWindow(this.textPromptRows);

    const currentTime = Date.now();
    const elapsedTime = currentTime - this.prevTime;

    if (this.isBackspaceKeypress) {
      if (this.promptCharPos > 0) {
        --this.promptCharPos;
      }

      if (this.mistakes > 0) {
        --this.mistakes;
      }

      if (this.correctCharCount > 0) {
        --this.correctCharCount;
      }
    } else {
      ++this.promptCharPos;
    }

    const { match, fontPos, mistake, isBackspace } = matchKeypressToTextPromt(
      this.textPrompt,
      this.keypress,
      this.promptCharPos
    );

    const updatedTextPrompt = updateStyledTextPrompt({
      textPrompt: this.styledTextPrompt,
      match,
      fontPos,
      isBackspace,
    });

    this.styledTextPrompt = updatedTextPrompt;

    if (mistake) {
      ++this.mistakes;
    } else {
      if (!isBackspace) {
        ++this.correctCharCount;
      }
    }

    // console.log({ key });
    if (this.promptCharPos === this.textPromptLength || key === "timeout") {
      this.saveStat(elapsedTime);
      return { nextScene: "result" };
    }

    return { nextScene: "" };
  }

  render() {
    setCursorPos();
    write(this.styledTextPrompt);
    positionTerminalCursor(this.promptCharPos + 1);
  }

  async saveStat(elapsedTime: number) {
    const accuracy = calculateAccuracy(
      this.correctCharCount,
      this.textPromptLength
    );
    const wpm = calculateWpm(this.promptCharPos, this.mistakes, elapsedTime);
    const stats = {
      accuracy,
      timeout: elapsedTime,
      mistakes: this.mistakes,
      wpm,
    };

    showCursor();
    await writeToFile("result", stats);
  }
}
