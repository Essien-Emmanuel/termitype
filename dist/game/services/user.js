import { writeToFile } from "../utils.game.js";
export const statInit = { accuracy: 0, mistakes: 0, timeout: 0, wpm: 0 };
export async function saveUser(user = {}) {
    await writeToFile("user", {
        name: "Typist",
        level: "beginner",
        improved: false,
        stat: statInit,
        ...user,
    });
}
