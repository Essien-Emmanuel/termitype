export default class Input {
  static isEnter(key: string): boolean {
    return key === "\r"
  }
  
  static isSpace(key: string): boolean {
    return key === " "
  }
  
  static isCtrlC(key: string):boolean {
    return key === "\u0003";
  }
  
  static isArrowUp(key: string): boolean {
    return key === "\x1B[A"
  }
  
  static isArrowDown(key: string):boolean {
    return key === "\x1B[B"
  }
  
  static isArrowLeft(key: string): boolean {
   return key === "\x1B[C";
  }
  
  static isArrowRight(key: string): boolean {
    return key === "\x1B[D"
  }
  
  static isChar(key: string, char: string): boolean {
    return key.toLowerCase() === char.toLowerCase()
    
  }
}