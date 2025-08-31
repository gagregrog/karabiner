import { isNotIntelCondition } from "../conditions";
import { Mapping } from "../utils";

const iceSearch = {
  description: "Trigger ice bar search",
  toKey: "f18",
  toModifiers: ["left_command"],
  conditions: isNotIntelCondition // **Ice not supported on intel**
} satisfies Mapping;

export const ice = {
  search: iceSearch
}
