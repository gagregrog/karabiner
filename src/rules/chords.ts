import { KeyCode, Manipulator, ModifiersKeys, Rule } from "../types";

export const chords: Rule = {
  description: "Home Row Mods",
  manipulators: [
    makeChord(["n", "e"], "right_shift"),
    makeChord(["e", "i"], "right_command"),
    makeChord(["s", "t"], "left_shift"),
    makeChord(["s", "r"], "left_command"),
    makeChord(["n", "u"], "left_control"),
    makeChord(["u", "y"], "left_alt"),
    //  "Activate Homerow.app click",
    makeChord(["n", "i"], "delete_or_backspace", [
      "left_alt",
      "left_shift",
      "left_command",
    ]),
    //  "Activate Homerow.app scrolling",
    makeChord(["r", "t"], "delete_or_backspace", [
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
      "basic.simultaneous_threshold_milliseconds": 50,
    },
    type: "basic",
  };
}
