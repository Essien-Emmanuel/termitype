import blessed, { Widgets } from "blessed";

export class Renderer {
  createScreen(options?: Widgets.IScreenOptions) {
    return blessed.screen(options);
  }

  createBox(options?: Widgets.BoxOptions) {
    return blessed.box(options);
  }
}
