import { state } from "../core/state.js";
export function showTimer({ timeout = 30000, interval: $interval = 1000, }) {
    let counter = timeout / 1000;
    process.stdout.write("\x1b[?25l");
    process.stdout.write("timer: " + String(counter));
    const interval = setInterval(() => {
        --counter;
        process.stdout.write("\x1b[H\x1b[G\x1b[2K");
        process.stdout.write("timer: " + String(counter));
        if (counter <= 0) {
            clearInterval(interval);
            process.stdout.write("\x1b[?25h");
        }
    }, $interval);
    state.timeout = interval;
}
// showTimer({ timeout: 10000 });
