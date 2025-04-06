import { KeyCode, Manipulator, ModifiersKeys } from "../types";
import {
  createTrackedKey,
  trackedKeyActive,
  trackedKeyInactive,
} from "../utils";
import { LAYERS_NAME } from "./capsLayers";

const modName = "caps_control";
const heldKey = "left_control" as const;

export const capsControl = createTrackedKey({
  description:
    "Change capslock to left_ctrl. Post escape if pressed alone, MNEI to arrow keys when caps_lock held",
  name: modName,
  fromKey: "caps_lock",
  toIfAloneKey: "escape",
  toIfHeldKey: heldKey,
  conditions: trackedKeyInactive(LAYERS_NAME),
  parameters: {
    "basic.to_if_alone_timeout_milliseconds": 100,
    "basic.to_if_held_down_threshold_milliseconds": 100,
  },
  manipulators: [
    // note that these remappings occur *after* simple modification remappings, so "n" is actually "j" if QWERTY remapped to ColemakDH
    remap("m", "left_arrow"),
    remap("n", "down_arrow"),
    remap("e", "up_arrow"),
    remap("i", "right_arrow"),
  ],
});

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
