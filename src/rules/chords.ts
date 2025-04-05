import { KeyCode, Manipulator, Rule } from "../types";

export const chords: Rule = {
  description: "Home Row Mods",
  manipulators: [
    makeChord("n", "e", "right_shift"),
    makeChord("e", "i", "right_command"),
    makeChord("s", "t", "left_shift"),
    makeChord("s", "r", "left_command"),
  ],
};

function makeChord(
  fromKey1: KeyCode,
  fromKey2: KeyCode,
  toKey: KeyCode
): Manipulator {
  return {
    description: `${fromKey1} + ${fromKey2} -> ${toKey}`,
    from: {
      simultaneous: [{ key_code: fromKey1 }, { key_code: fromKey2 }],
      modifiers: { optional: ["any"] },
    },
    to: [{ key_code: toKey }],
    parameters: {
      "basic.simultaneous_threshold_milliseconds": 50,
    },
    type: "basic",
  };
}
