export const borderStyles = {
  single: {
    topLeft: "┌", // U+250C BOX DRAWINGS LIGHT DOWN AND RIGHT
    top: "─", // U+2500 BOX DRAWINGS LIGHT HORIZONTAL
    topRight: "┐", // U+2510 BOX DRAWINGS LIGHT DOWN AND LEFT
    left: "│", // U+2502 BOX DRAWINGS LIGHT VERTICAL
    right: "│", // U+2502 BOX DRAWINGS LIGHT VERTICAL
    bottomLeft: "└", // U+2514 BOX DRAWINGS LIGHT UP AND RIGHT
    bottom: "─", // U+2500 BOX DRAWINGS LIGHT HORIZONTAL
    bottomRight: "┘", // U+2518 BOX DRAWINGS LIGHT UP AND LEFT
  },

  double: {
    topLeft: "╔", // U+2554 BOX DRAWINGS DOUBLE DOWN AND RIGHT
    top: "═", // U+2550 BOX DRAWINGS DOUBLE HORIZONTAL
    topRight: "╗", // U+2557 BOX DRAWINGS DOUBLE DOWN AND LEFT
    left: "║", // U+2551 BOX DRAWINGS DOUBLE VERTICAL
    right: "║", // U+2551 BOX DRAWINGS DOUBLE VERTICAL
    bottomLeft: "╚", // U+255A BOX DRAWINGS DOUBLE UP AND RIGHT
    bottom: "═", // U+2550 BOX DRAWINGS DOUBLE HORIZONTAL
    bottomRight: "╝", // U+255D BOX DRAWINGS DOUBLE UP AND LEFT
  },

  round: {
    topLeft: "╭", // U+256D BOX DRAWINGS LIGHT ARC DOWN AND RIGHT
    top: "─", // U+2500 BOX DRAWINGS LIGHT HORIZONTAL
    topRight: "╮", // U+256E BOX DRAWINGS LIGHT ARC DOWN AND LEFT
    left: "│", // U+2502 BOX DRAWINGS LIGHT VERTICAL
    right: "│", // U+2502 BOX DRAWINGS LIGHT VERTICAL
    bottomLeft: "╰", // U+2570 BOX DRAWINGS LIGHT ARC UP AND RIGHT
    bottom: "─", // U+2500 BOX DRAWINGS LIGHT HORIZONTAL
    bottomRight: "╯", // U+256F BOX DRAWINGS LIGHT ARC UP AND LEFT
  },

  bold: {
    topLeft: "┏", // U+250F BOX DRAWINGS HEAVY DOWN AND RIGHT
    top: "━", // U+2501 BOX DRAWINGS HEAVY HORIZONTAL
    topRight: "┓", // U+2513 BOX DRAWINGS HEAVY DOWN AND LEFT
    left: "┃", // U+2503 BOX DRAWINGS HEAVY VERTICAL
    right: "┃", // U+2503 BOX DRAWINGS HEAVY VERTICAL
    bottomLeft: "┗", // U+2517 BOX DRAWINGS HEAVY UP AND RIGHT
    bottom: "━", // U+2501 BOX DRAWINGS HEAVY HORIZONTAL
    bottomRight: "┛", // U+251B BOX DRAWINGS HEAVY UP AND LEFT
  },

  dotted: {
    topLeft: "┌", // U+250C BOX DRAWINGS LIGHT DOWN AND RIGHT
    top: "┈", // U+2508 BOX DRAWINGS LIGHT QUADRUPLE DASH HORIZONTAL
    topRight: "┐", // U+2510 BOX DRAWINGS LIGHT DOWN AND LEFT
    left: "┊", // U+250A BOX DRAWINGS LIGHT QUADRUPLE DASH VERTICAL
    right: "┊", // U+250A BOX DRAWINGS LIGHT QUADRUPLE DASH VERTICAL
    bottomLeft: "└", // U+2514 BOX DRAWINGS LIGHT UP AND RIGHT
    bottom: "┈", // U+2508 BOX DRAWINGS LIGHT QUADRUPLE DASH HORIZONTAL
    bottomRight: "┘", // U+2518 BOX DRAWINGS LIGHT UP AND LEFT
  },

  dashed: {
    topLeft: "┌", // U+250C BOX DRAWINGS LIGHT DOWN AND RIGHT
    top: "┄", // U+2504 BOX DRAWINGS LIGHT TRIPLE DASH HORIZONTAL
    topRight: "┐", // U+2510 BOX DRAWINGS LIGHT DOWN AND LEFT
    left: "┆", // U+2506 BOX DRAWINGS LIGHT TRIPLE DASH VERTICAL
    right: "┆", // U+2506 BOX DRAWINGS LIGHT TRIPLE DASH VERTICAL
    bottomLeft: "└", // U+2514 BOX DRAWINGS LIGHT UP AND RIGHT
    bottom: "┄", // U+2504 BOX DRAWINGS LIGHT TRIPLE DASH HORIZONTAL
    bottomRight: "┘", // U+2518 BOX DRAWINGS LIGHT UP AND LEFT
  },

  doubleDotted: {
    topLeft: "┌", // U+250C BOX DRAWINGS LIGHT DOWN AND RIGHT
    top: "╌", // U+254C BOX DRAWINGS LIGHT DOUBLE DASH HORIZONTAL
    topRight: "┐", // U+2510 BOX DRAWINGS LIGHT DOWN AND LEFT
    left: "╎", // U+254E BOX DRAWINGS LIGHT DOUBLE DASH VERTICAL
    right: "╎", // U+254E BOX DRAWINGS LIGHT DOUBLE DASH VERTICAL
    bottomLeft: "└", // U+2514 BOX DRAWINGS LIGHT UP AND RIGHT
    bottom: "╌", // U+254C BOX DRAWINGS LIGHT DOUBLE DASH HORIZONTAL
    bottomRight: "┘", // U+2518 BOX DRAWINGS LIGHT UP AND LEFT
  },

  singleDouble: {
    topLeft: "╓", // U+2553 BOX DRAWINGS DOWN SINGLE AND RIGHT DOUBLE
    top: "─", // U+2500 BOX DRAWINGS LIGHT HORIZONTAL
    topRight: "╖", // U+2556 BOX DRAWINGS DOWN DOUBLE AND LEFT SINGLE
    left: "║", // U+2551 BOX DRAWINGS DOUBLE VERTICAL
    right: "║", // U+2551 BOX DRAWINGS DOUBLE VERTICAL
    bottomLeft: "╙", // U+2559 BOX DRAWINGS UP SINGLE AND RIGHT DOUBLE
    bottom: "─", // U+2500 BOX DRAWINGS LIGHT HORIZONTAL
    bottomRight: "╜", // U+255C BOX DRAWINGS UP DOUBLE AND LEFT SINGLE
  },

  doubleSingle: {
    topLeft: "╒", // U+2552 BOX DRAWINGS DOWN DOUBLE AND RIGHT SINGLE
    top: "═", // U+2550 BOX DRAWINGS DOUBLE HORIZONTAL
    topRight: "╕", // U+2555 BOX DRAWINGS DOWN SINGLE AND LEFT DOUBLE
    left: "│", // U+2502 BOX DRAWINGS LIGHT VERTICAL
    right: "│", // U+2502 BOX DRAWINGS LIGHT VERTICAL
    bottomLeft: "╘", // U+2558 BOX DRAWINGS UP DOUBLE AND RIGHT SINGLE
    bottom: "═", // U+2550 BOX DRAWINGS DOUBLE HORIZONTAL
    bottomRight: "╛", // U+255B BOX DRAWINGS UP SINGLE AND LEFT DOUBLE
  },

  classic: {
    topLeft: "+",
    top: "-",
    topRight: "+",
    left: "|",
    right: "|",
    bottomLeft: "+",
    bottom: "-",
    bottomRight: "+",
  },

  arrow: {
    topLeft: "↘", // corner down-right
    top: "↓", // vertical down
    topRight: "↙", // corner down-left
    left: "→", // horizontal right
    right: "←", // horizontal left
    bottomLeft: "↗", // corner up-right
    bottom: "↑", // vertical up
    bottomRight: "↖", // corner up-left
  },

  none: {
    topLeft: "",
    top: "",
    topRight: "",
    left: "",
    right: "",
    bottomLeft: "",
    bottom: "",
    bottomRight: "",
  },
};
