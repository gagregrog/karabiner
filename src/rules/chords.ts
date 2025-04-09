import { KeyCode, Manipulator, ModifiersKeys, Rule } from "../types";

export const chords: Rule = {
  description: "Home Row Mods",
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
    //  "Activate Homerow.app click",
    makeChord(["s", "e"], "delete_or_backspace", [
      "left_alt",
      "left_shift",
      "left_command",
    ]),
    //  "Activate Homerow.app scrolling",
    makeChord(["t", "n"], "delete_or_backspace", [
      "left_shift",
      "left_command",
    ]),
  ],
};

function makeChord(
  fromKeys: KeyCode[],
  toKey: KeyCode,
  toModifiers: ModifiersKeys[] = []
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
