import { KeyCode, Manipulator, ModifierKey, Rule } from "../types";

export const fKeys: Rule = {
  description: "Make f keys do cool things",
  manipulators: [
    // Homerow.app click shortcut
    makeFKey("f23", "delete_or_backspace", [
      "left_shift",
      "left_command",
      "left_alt",
    ]),
    // Homerow.app scroll shortcut
    makeFKey("f24", "delete_or_backspace", ["left_shift", "left_command"]),
  ],
};

function makeFKey(
  fromKey: KeyCode,
  toKey: KeyCode,
  toModifiers: ModifierKey[] = []
): Manipulator {
  return {
    description: `${fromKey} -> ${[toKey, ...toModifiers].join(" + ")}`,
    from: {
      key_code: fromKey,
      modifiers: { optional: ["any"] },
    },
    to: [{ key_code: toKey, modifiers: toModifiers }],
    type: "basic",
  };
}
