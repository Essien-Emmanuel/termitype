export async function delay(ms: number = 3000) {
  await new Promise((resolve) => {
    setTimeout(() => {
      return resolve(null);
    }, ms);
  });
}
