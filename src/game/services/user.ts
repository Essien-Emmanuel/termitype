import type { User } from "../@types";
import { writeToFile } from "../utils.game";

export const statInit = { accuracy: 0, mistakes: 0, timeout: 0, wpm: 0 };

export async function saveUser(user?: User) {
  let savedUser = user;
  if (!savedUser) {
    savedUser = {
      name: "Typist",
      level: "beginner",
      improved: false,
      stat: statInit,
    };
  }

  await writeToFile("user", savedUser);
}
