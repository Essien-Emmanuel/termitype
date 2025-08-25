import blessed, { Widgets } from "blessed";

class _Renderer {
  createScreen(options?: Widgets.IScreenOptions) {
    return blessed.screen(options);
  }

  createBox(options?: Widgets.BoxOptions) {
    return blessed.box(options);
  }
}

export const Renderer = new _Renderer();
