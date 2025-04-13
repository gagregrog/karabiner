import { lcag } from "../../mods";
import { LayerKeySublayer } from "../../utils";

/**
 * Window movement and resizing managed by hammerspoon.Windex
 */
export const windexLayer: LayerKeySublayer = {
  u: lcag("up_arrow", "Upper Half"),
  n: lcag("left_arrow", "Left Half"),
  comma: lcag("down_arrow", "Lower Half"),
  i: lcag("right_arrow", "Right Half"),
  e: lcag("return_or_enter", "Fullscreen"),
  return_or_enter: lcag("return_or_enter", "Fullscreen"),
  y: lcag("f15", "Upper Right"),
  period: lcag("f16", "Lower Right"),
  l: lcag("f17", "Upper Left"),
  h: lcag("f18", "Lower Left"),
};
