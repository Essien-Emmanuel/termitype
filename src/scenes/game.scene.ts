import type { InputKey, UpdateSceneReponse, WordMapReturnType } from "@/@types";
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
  createAfterWordMap,
  matchKeypressToTextPromt,
  readGameFile,
  updateStyledTextPrompt,
  writeToFile,
} from "@/game/utils.game";
import { Input } from "@/core/input";

const { isBackspace: checkBackspace, isEnter, isChar, isCtrlL } = Input;

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
  private initTimeout: number;
  private timeUsed: number;
  protected afterWordMap: WordMapReturnType | null;
  protected afterWordMapKeys: string[] | null;
  protected wordIndex: number;
  protected storedWord: string;
  protected wKeyCount: number;

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
    this.initTimeout = 10000;
    this.timeUsed = 0;

    // #1 set up to track word
    this.afterWordMap = null;
    this.afterWordMapKeys = null;
    this.wordIndex = 0;
    this.storedWord = "";
    this.wKeyCount = 0;
  }

  private async _initGameState(filename: string) {
    const { styledTextPrompt, textPromptRows, textPromptLength, textPrompt } =
      await initializeGame(filename);

    this.styledTextPrompt = styledTextPrompt;
    this.textPromptLength = textPromptLength;
    this.textPromptRows = textPromptRows;
    this.textPrompt = textPrompt;
    this.timeout = this.initTimeout;

    // #1
    this.afterWordMap = createAfterWordMap(textPrompt);
    this.afterWordMapKeys = Object.keys(this.afterWordMap);

    await writeToFile("game-state", this);
    return;
  }

  async init(initArg: string) {
    clearEntireScreen();
    // set cursor position
    moveDownBy(1);

    console.log("initializing game...");

    delay();
    clearEntireScreen();
    moveDownBy(1);
    showCursor();

    const gameState = await readGameFile("/saves/game-state.json");

    if (!gameState) {
      this._initGameState(initArg);

      return;
    }

    const data: typeof this = JSON.parse(gameState);
    const stateDataLen = Object.keys(data).length;

    if (!stateDataLen) {
      this._initGameState(initArg);
      return;
    }

    this.correctCharCount = data.correctCharCount;
    this.isBackspaceKeypress = data.isBackspaceKeypress;
    this.keypress = data.keypress;
    this.keypressCount = data.keypressCount;
    this.mistakes = data.mistakes;
    this.promptCharPos = data.promptCharPos;
    this.storedKeypress = data.storedKeypress;
    this.styledTextPrompt = data.styledTextPrompt;
    this.textPromptRows = data.textPromptRows;
    this.textPromptLength = data.textPromptLength;
    this.textPrompt = data.textPrompt;
    this.timeUsed = data.timeUsed;
    this.timeout = data.timeout;
    this.prevTime = 0;
    this.cancelSetTimout = false;

    write(this.styledTextPrompt);
    positionTerminalCursor(this.promptCharPos + 1);

    return;
  }

  async update($key: InputKey): UpdateSceneReponse {
    if (!this.prevTime) this.prevTime = Date.now();

    const currentTime = Date.now();
    const elapsedTime = currentTime - this.prevTime;
    const timeoutLeft = this.timeout - elapsedTime;
    this.timeUsed = this.initTimeout - timeoutLeft;

    if (isCtrlL($key)) {
      this.cancelSetTimout = true;
      /**
       *  save the state of the game
       */
      const gameState: this = { ...this, timeout: timeoutLeft };

      await writeToFile("game-state", gameState);
      return { nextScene: "gameMenu" };
    }

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

    if (isChar(key, "timeout")) {
      this.saveStat(this.timeUsed);
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

      // #1
      if (
        this.wordIndex > 0 &&
        this.afterWordMapKeys &&
        this.keypressCount <= +this.afterWordMapKeys[this.wordIndex - 1]
      ) {
        --this.wordIndex;
        const currWordKey = this.afterWordMapKeys[this.wordIndex];
        if (this.afterWordMap) {
          const wordData = this.afterWordMap[currWordKey].typed;
          this.storedWord = wordData.slice(0, -1);
        }
      }
      this.wKeyCount = Math.max(--this.wKeyCount, 0);
      this.storedWord = this.storedWord.slice(0, -1);
    } else {
      ++this.promptCharPos;

      // #1
      this.wKeyCount = Math.min(++this.wKeyCount, this.textPrompt.length);
      this.storedWord += key;
      if (
        this.afterWordMapKeys &&
        this.wKeyCount > +this.afterWordMapKeys[this.wordIndex]
      ) {
        ++this.wordIndex;
      }
    }

    // #1
    if (
      this.afterWordMap &&
      this.wKeyCount in this.afterWordMap &&
      !this.isBackspaceKeypress
    ) {
      this.afterWordMap[this.wKeyCount].typed = this.storedWord;
      if (!this.afterWordMap[this.wKeyCount].visited) {
        this.afterWordMap[this.wKeyCount].visited = true;
      } else {
        this.afterWordMap[this.wKeyCount].corrected = true;
      }
      this.storedWord = "";
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
      /**
       * Save the stats of the player
       */
      this.saveStat(this.timeUsed);
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
    const uncorrectedErrorsCount = this._countUncorrectedErrors();

    const accuracy = calculateAccuracy(
      this.correctCharCount,
      this.textPromptLength
    );

    const wpm = calculateWpm(
      this.promptCharPos,
      uncorrectedErrorsCount,
      elapsedTime
    );
    const stats = {
      accuracy,
      timeout: elapsedTime,
      mistakes: this.mistakes,
      wpm,
    };

    showCursor();
    await writeToFile("result", stats);
    await writeToFile("game-state", {});
  }

  private _countUncorrectedErrors() {
    if (!this.afterWordMap) return 0;
    const wordMapValues = Object.values(this.afterWordMap);
    const uncorrectedWordCount = wordMapValues.reduce((acc, curr) => {
      if (!curr.corrected && curr.word !== curr.typed) {
        ++acc;
      }
      return acc;
    }, 0);
    return uncorrectedWordCount;
  }
}
