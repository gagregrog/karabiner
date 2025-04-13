import { alt, altShift, hyper } from "../../mods";
import { LayerKeySublayer } from "../../utils";

/**
 * Focus cycles, managment toggles, and arrangement
 *   keybinds managed by skhd
 *   functions managed by yabai and yabai.sh
 */
export const yabaiLayer: LayerKeySublayer = {
  b: alt("b", "Yabai balance splits"),
  f: alt("t", "Yabai toggle float"),
  t: altShift("t", "Yabai toggle managed mode"),
  p: alt("p", "Yabai focus previous window"),
  s: alt("n", "Yabai focus next window"),
  g: alt("f", "Yabai focus next managed window"),
  a: altShift("f", "Yabai focus previous managed window"),
  r: alt("r", "Yabai rotate splits"),
  c: alt("c", "Yabai cycle split"),
  d: hyper("s", "Yabai toggle split"),
};
