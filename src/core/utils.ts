export default class Utils {
  static wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
