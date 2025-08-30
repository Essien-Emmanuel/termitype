const FPS = 60;
const milliSecPerUpdate = 1000 / FPS;

function loop() {
  let prevTime = Date.now();
  let elapsedTime = 0;
  let lag = 0;

  while (true) {
    const currentTime = Date.now();
    elapsedTime = currentTime - prevTime;
    lag += elapsedTime;

    if (lag >= milliSecPerUpdate) {
      update();
      lag -= milliSecPerUpdate;
    }
    draw();
  }
}

export function update() {
  console.log("Updating game state...");
}

export function draw() {
  console.log("drawn");
}

loop();
