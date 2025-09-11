import type { InputKey, UpdateSceneReponse } from "@/@types";
import {
  clearEntireScreen,
  moveDownBy,
  positionTerminalCursor,
  resetTerminalWindow,
  setCursorPos,
  showCursor,
  write,
} from "@/core/io";
import { Scene } from "@/core/scene";
import { delay } from "@/core/utils";
import { initializeGame } from "@/game/init";
import { calculateAccuracy, calculateWpm } from "@/game/math.game";
import {
  matchKeypressToTextPromt,
  updateStyledTextPrompt,
  writeToFile,
} from "@/game/utils.game";
import { Input } from "@/core/input";

const { isBackspace: checkBackspace, isEnter, isChar, isCtrlL } = Input;

export type GameStateConfig = {
  keypress: InputKey;
  storedKeypress: string;
  keypressCount: number;
  correctCharCount: number;
  prevTime: number;
  textPromptRows: number;
  promptCharPos: number;
  mistakes: number;
  textPromptLength: number;
  textPrompt: string;
  styledTextPrompt: string;
  isBackspaceKeypress: boolean;
};

export class GameScene extends Scene {
  public keypress: InputKey;
  public storedKeypress: string;
  public keypressCount: number;
  public correctCharCount: number;
  public prevTime: number;
  public textPromptRows: number;
  public promptCharPos: number;
  public mistakes: number;
  public textPromptLength: number;
  public textPrompt: string;
  public styledTextPrompt: string;
  public isBackspaceKeypress: boolean;

  constructor() {
    super();
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

    /**
     * if saved state, fill all the data and call render
     */

    const { styledTextPrompt, textPromptRows, textPromptLength, textPrompt } =
      await initializeGame();

    this.styledTextPrompt = styledTextPrompt;
    this.textPromptLength = textPromptLength;
    this.textPromptRows = textPromptRows;
    this.textPrompt = textPrompt;
    this.timeout = 1000 * 5;

    await writeToFile("game-state", this);
  }

  async update($key: InputKey): UpdateSceneReponse {
    if (isCtrlL($key)) {
      this.cancelSetTimout = true;

      /**
       *  save the state of the game
       */
      await writeToFile("game-state", this);
      return { nextScene: "gameMenu" };
    }

    if (!this.prevTime) this.prevTime = Date.now();

    let key = $key;

    this.storedKeypress += key;
    this.keypress = key;
    ++this.keypressCount;
    this.isBackspaceKeypress = false;

    if (checkBackspace(key)) {
      this.isBackspaceKeypress = true;
    }

    if (isEnter(key)) {
      setCursorPos(this.promptCharPos);
      return { nextScene: "" };
    }

    resetTerminalWindow(this.textPromptRows);

    const currentTime = Date.now();
    const elapsedTime = currentTime - this.prevTime;

    if (isChar(key, "timeout")) {
      this.saveStat(elapsedTime);
      return { nextScene: "result" };
    }

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
      console.log(this);
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
