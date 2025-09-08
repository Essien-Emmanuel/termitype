import {
  clearEntireScreen,
  moveDownBy,
  positionTerminalCursor,
  resetTerminalWindow,
  setCursorPos,
  showCursor,
  write,
} from "@/core/io";
import { delay } from "@/core/utils";
import { initializeGame } from "@/game/init";
import { calculateAccuracy, calculateWpm } from "@/game/math.game";
import {
  matchKeypressToTextPromt,
  showStats,
  updateStyledTextPrompt,
  writeToFile,
} from "@/game/utils.game";

export class GameScene {
  public keypress: string | null;
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
    this.keypress = null;
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

  async update($key: string): Promise<{ nextScene: string }> {
    let key = $key;

    if (key === "\r") {
      key = "";
    }

    this.storedKeypress += key;
    this.keypress = key;
    ++this.keypressCount;
    this.isBackspaceKeypress = false;

    if (key === "\u0008") {
      this.isBackspaceKeypress = true;
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

    if (this.promptCharPos === this.textPromptLength) {
      // if (this.storedKeypress === this.textPrompt) {
      //   console.log("\nyou win");
      // } else {
      //   console.log("\nCompleted");
      // }
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
      return { nextScene: "result" };
    }

    //   if (isTimeout) {
    //     moveDownBy(this.textPromptRows + 1);
    //     const accuracy = calculateAccuracy(this.correctCharCount, this.textPromptLength);
    //     const wpm = calculateWpm(this.promptCharPos, this.mistakes, elapsedTime);

    //     showStats({ accuracy, timeout: elapsedTime, mistakes, wpm });
    //     showCursor();
    //     process.exit();
    //   }
    ///

    return { nextScene: "" };
  }

  render() {
    setCursorPos();
    // log to screen
    write(this.styledTextPrompt);

    positionTerminalCursor(this.promptCharPos + 1);
  }
}
