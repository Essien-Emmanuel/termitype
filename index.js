#!/usr/bin/env Node
import { initInput, promptInput, writeLine } from "./core/io.js";

initInput(key => {
  if (key === "p") {
    promptInput(answer => {
      writeLine(`You typed: ${answer}`);
    });
  }
});
