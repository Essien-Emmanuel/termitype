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
    this.initTimeout = 5000;
    this.timeUsed = 0;
  }

  private async _initGameState() {
    const { styledTextPrompt, textPromptRows, textPromptLength, textPrompt } =
      await initializeGame();

    this.styledTextPrompt = styledTextPrompt;
    this.textPromptLength = textPromptLength;
    this.textPromptRows = textPromptRows;
    this.textPrompt = textPrompt;
    this.timeout = this.initTimeout;

    await writeToFile("game-state", this);
    return;
  }

  async init() {
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
      this._initGameState();
      return;
    }

    const data: typeof this = JSON.parse(gameState);
    const stateDataLen = Object.keys(data).length;

    if (!stateDataLen) {
      this._initGameState();
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
    await writeToFile("game-state", {});
  }
}
