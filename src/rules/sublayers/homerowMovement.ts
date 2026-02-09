import { KeyCode } from "../../types";
import { LayerCommand, Sublayers, to } from "../../utils";

const arrowMappings = [
  ["m", "left_arrow"],
  ["n", "down_arrow"],
  ["e", "up_arrow"],
  ["i", "right_arrow"],
] as const satisfies Array<[KeyCode, KeyCode]>;

type ArrowMapping = Record<(typeof arrowMappings)[number][0], LayerCommand>;

/**
 * Home Row arrow navigation + capslock -> command modified
 */
export const homerowMovementKeys = {
  ...arrowMappings.reduce(
    (acc, [fromCode, toCode]) => ({
      ...acc,
      [fromCode]: to(toCode),
    }),
    {} as ArrowMapping
  ),
  caps_lock: arrowMappings.reduce(
    (acc, [fromCode, toCode]) => ({
      ...acc,
      [fromCode]: to(toCode, ["command"]),
    }),
    {} as ArrowMapping
  ),
} satisfies Sublayers;
