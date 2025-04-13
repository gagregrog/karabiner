import { altShift, meh } from "../../mods";
import { LayerKeySublayer } from "../../utils";

/**
 * Relative focus, relative arrangement
 *   keybinds managed by skhd
 *   functions managed by yabai and yabai.sh
 */
export const yabaiMovementLayer: LayerKeySublayer = {
  m: altShift("m", "Yabai focus managed window west"),
  n: altShift("n", "Yabai focus managed window south"),
  e: altShift("e", "Yabai focus managed window north"),
  i: altShift("i", "Yabai focus managed window east"),
  r: meh("m", "Yabai swap managed window west"),
  t: meh("n", "Yabai swap managed window south"),
  s: meh("e", "Yabai swap managed window north"),
  g: meh("i", "Yabai swap managed window east"),
};
