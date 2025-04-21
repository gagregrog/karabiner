import { KeyCode, Manipulator } from "../types";
import {
  createTrackedKey,
  remap,
  trackedKeyActive,
  trackedKeyInactive,
} from "../utils";
import { CAPS_MOD, LAYERS_NAME } from "./variableNames";

const heldKey = "left_control" as const;

export const capsControl = createTrackedKey({
  description:
    "Change capslock to left_ctrl. Post escape if pressed alone, MNEI to arrow keys when caps_lock held",
  name: CAPS_MOD,
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
    capsControlManipulator("m", "left_arrow"),
    capsControlManipulator("n", "down_arrow"),
    capsControlManipulator("e", "up_arrow"),
    capsControlManipulator("i", "right_arrow"),
  ],
});

/**
 * Remap a key while the caps_control modifier is active
 */
function capsControlManipulator(fromKey: KeyCode, toKey: KeyCode): Manipulator {
  return remap(fromKey, {
    toKey,
    conditions: trackedKeyActive(CAPS_MOD),
    fromModifiers: [heldKey],
  });
}
