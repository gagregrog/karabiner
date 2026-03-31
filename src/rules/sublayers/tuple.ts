import { LayerKeySublayer, to, withConditions } from "../../utils";
import { isNotIntelCondition } from "../../conditions";

/**
 * Tuple shortcuts
 */
export const tupleLayer: LayerKeySublayer = {
  m: withConditions(
    to("backslash", ["option", "shift", "command"]),
    isNotIntelCondition
  ),
  e: withConditions(
    to("quote", ["option", "shift", "command"]),
    isNotIntelCondition
  ),
  delete_or_backspace: withConditions(
    to("grave_accent_and_tilde", ["option", "shift", "command"]),
    isNotIntelCondition
  ),
};
