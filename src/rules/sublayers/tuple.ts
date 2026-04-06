import { KeyCode } from "../../types";
import { LayerCommand, LayerKeySublayer, to, withConditions } from "../../utils";
import { isNotIntelCondition } from "../../conditions";

const tupleCommands: Partial<Record<KeyCode, LayerCommand>> = {
  m: to("backslash", ["option", "shift", "command"]),
  e: to("quote", ["option", "shift", "command"]),
  delete_or_backspace: to("grave_accent_and_tilde", ["option", "shift", "command"]),
  h: to("1", ["option", "shift", "command"]),
  comma: to("2", ["option", "shift", "command"]),
  period: to("3", ["option", "shift", "command"]),
};

export const tupleLayer: LayerKeySublayer = Object.fromEntries(
  Object.entries(tupleCommands).map(([key, command]) => [
    key,
    withConditions(command as LayerCommand, isNotIntelCondition),
  ])
) as LayerKeySublayer;
