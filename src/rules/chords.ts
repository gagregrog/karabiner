import { isBuiltInCondition } from "../conditions";
import { KeyCode, Manipulator, ModifierKey, Rule } from "../types";
import { withConditions } from "../utils";

export const chords: Rule = {
  description: "Chords for built in keyboard only",
  manipulators: [
    makeChord(["n", "e"], "right_shift"),
    makeChord(["e", "i"], "right_command"),
    makeChord(["l", "u"], "right_alt"),
    makeChord(["u", "y"], "right_control"),
    makeChord(["s", "t"], "left_shift"),
    makeChord(["s", "r"], "left_command"),
    makeChord(["f", "p"], "left_alt"),
    makeChord(["w", "f"], "left_control"),
    makeChord(["h", "comma"], "right_command", ["right_shift"]),
    makeChord(["c", "d"], "left_command", ["left_shift"]),
    makeChord(["comma", "period"], "right_command", ["right_option"]),
    makeChord(["x", "c"], "left_command", ["left_option"]),
    // mapping hrm chords to the same f-keys that qmk will send for hrm combos
    // these are triggered when the same hrm modifier is activated simultaneously
    makeChord(["a", "o"], "f21"),
    makeChord(["r", "i"], "f22"),
    makeChord(["s", "e"], "f23"),
    makeChord(["t", "n"], "f24"),
  ].map((manipulator) => withConditions(manipulator, isBuiltInCondition)),
};

function makeChord(
  fromKeys: KeyCode[],
  toKey: KeyCode,
  toModifiers: ModifierKey[] = []
): Manipulator {
  return {
    description: `${fromKeys.join(" + ")} -> ${[toKey, ...toModifiers].join(
      " + "
    )}`,
    from: {
      simultaneous: fromKeys.map((key_code) => ({ key_code })),
      modifiers: { optional: ["any"] },
    },
    to: [{ key_code: toKey, modifiers: toModifiers }],
    parameters: {
      "basic.simultaneous_threshold_milliseconds": 25,
    },
    type: "basic",
  };
}
