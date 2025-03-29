import { Rule } from "../types";

export const commandCommand: Rule = {
  description: "Both command keys to command+tab (single press)",
  manipulators: [
    {
      from: {
        key_code: "left_command",
        modifiers: { mandatory: ["right_command"] },
      },
      to: [
        {
          key_code: "tab",
          modifiers: ["left_command"],
        },
      ],
      type: "basic",
    },
    {
      from: {
        key_code: "right_command",
        modifiers: { mandatory: ["left_command"] },
      },
      to: [
        {
          key_code: "tab",
          modifiers: ["left_command"],
        },
      ],
      type: "basic",
    },
  ],
};
