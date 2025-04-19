import { createTrackedKey, trackedKeyInactive } from "../utils";
import { LAYERS_NAME, SHIFT_MOD } from "./variableNames";

/**
 * Effectively used to disable spaceLayers while shift is held so that we
 * can use space and backspace as normal keys instead of layer activators
 */
export const shiftMod = (["left_shift", "right_shift"] as const).map(
  (shiftKey) =>
    createTrackedKey({
      description: `Track when ${shiftKey} is pressed in order to disable spaceLayers`,
      name: SHIFT_MOD,
      fromKey: shiftKey,
      toIfHeldKey: shiftKey,
      parameters: {
        // ensure that shift is always held right away
        "basic.to_if_held_down_threshold_milliseconds": 0,
      },
      conditions: trackedKeyInactive(LAYERS_NAME),
    })
);
