import { LayerKeySublayer, to } from "../../utils";

export const tupleLayer: LayerKeySublayer = {
  m: to("backslash", ["option", "shift", "command"]),
  e: to("quote", ["option", "shift", "command"]),
  delete_or_backspace: to("grave_accent_and_tilde", ["option", "shift", "command"]),
  l: to("1", ["option", "shift", "command"]),
  u: to("2", ["option", "shift", "command"]),
  y: to("3", ["option", "shift", "command"]),
  n: to("9", ["option", "shift", "command"]),
};
