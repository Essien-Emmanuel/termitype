class Utils {
  static wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
}
