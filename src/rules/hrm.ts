import { KeyCode, Manipulator, Rule } from "../types";

const TIMEOUT = 225;

export const homeRowMods: Rule = {
  description: "Home Row Mods",
  manipulators: [
    makeHrm("a", "left_control"),
    makeHrm("r", "left_alt"),
    makeHrm("s", "left_gui"),
    makeHrm("t", "left_shift"),
    makeHrm("n", "right_shift"),
    makeHrm("e", "right_gui"),
    makeHrm("i", "right_alt"),
    makeHrm("o", "right_control"),
  ],
};

function makeHrm(fromKey: KeyCode, toKey: KeyCode): Manipulator {
  return {
    description: `${fromKey} -> ${toKey}`,
    from: {
      key_code: fromKey,
      modifiers: { optional: ["any"] },
    },
    // "to" cannot be used because it would send until the hold was activated
    // this is a tradeoff, as rolls mya not work well
    // pecking is required in order to avoid typos
    to_after_key_up: [{ key_code: fromKey }],
    // "halt" says don't send the keycode if the hold was activated
    to_if_held_down: [{ key_code: toKey, halt: true }],
    parameters: {
      "basic.to_if_held_down_threshold_milliseconds": TIMEOUT,
    },
    type: "basic",
  };
}
