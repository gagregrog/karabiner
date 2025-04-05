import { KeyCode, Manipulator, ModifiersKeys, Rule } from "../types";
import { createTrackedKey, trackedKeyActive } from "../utils";

const modName = "caps_control";
const heldKey = "left_control" as const;

const trackedControl = createTrackedKey({
  description:
    "Change capslock to left_ctrl. Post escape if pressed alone, backspace with space, MNEI to HJKL when caps_lock held, n to command+shift+delete when left shift held",
  name: modName,
  fromKey: "caps_lock",
  toIfAloneKey: "escape",
  toIfHeldKey: heldKey,
  parameters: {
    "basic.to_if_alone_timeout_milliseconds": 100,
    "basic.to_if_held_down_threshold_milliseconds": 100,
  },
});

export const capsControl: Rule = {
  ...trackedControl,
  manipulators: [
    ...trackedControl.manipulators,
    // note that these remappings occur *after* simple modification remappings, so "n" is actually "j" if QWERTY remapped to ColemakDH
    remap("n", "delete_or_backspace", {
      description: "Activate Homerow.app scrolling",
      fromModifiers: ["left_shift"],
      toModifiers: ["left_shift", "left_command"],
    }),
    remap("e", "delete_or_backspace", {
      description: "Activate Homerow.app click",
      fromModifiers: ["left_shift"],
      toModifiers: ["left_alt", "left_shift", "left_command"],
    }),
    // remap("spacebar", "delete_or_backspace"),
    remap("m", "left_arrow"),
    remap("n", "down_arrow"),
    remap("e", "up_arrow"),
    remap("i", "right_arrow"),
  ],
};

/**
 * Remap a key while the caps_control modifier is active
 */
function remap(
  fromKey: KeyCode,
  toKey: KeyCode,
  {
    description = "",
    fromModifiers = [],
    toModifiers = [],
  }: {
    description?: string;
    fromModifiers?: ModifiersKeys[];
    toModifiers?: ModifiersKeys[];
  } = {}
): Manipulator {
  return {
    description: description || `${fromKey} -> ${toKey}`,
    conditions: trackedKeyActive(modName),
    from: {
      key_code: fromKey,
      modifiers: { mandatory: [heldKey, ...fromModifiers] },
    },
    to: [{ key_code: toKey, modifiers: toModifiers }],
    type: "basic",
  };
}
