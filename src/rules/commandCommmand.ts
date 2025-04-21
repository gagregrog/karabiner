import { Rule } from "../types";
import { remap } from "../utils";

export const commandCommand: Rule = {
  description: "Both command keys to command+tab (single press)",
  manipulators: [
    remap("left_command", {
      fromModifiers: ["right_command"],
      toKey: "tab",
      toModifiers: ["left_command"],
    }),
    remap("right_command", {
      fromModifiers: ["left_command"],
      toKey: "tab",
      toModifiers: ["right_command"],
    }),
  ],
};
