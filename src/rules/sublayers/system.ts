import { addMods, hyper } from "../../mods";
import { LayerKeySublayer, to } from "../../utils";

/**
 * Sytsem controls like lock, audio management, keycastr
 */
export const systemLayer: LayerKeySublayer = {
  l: addMods(
    "q",
    ["right_control", "right_command"],
    "Lock the computer with spacebar + s + l"
  ),
  m: to("play_or_pause"),
  u: to("volume_increment"),
  e: to("volume_decrement"),
  i: to("fastforward"),
  n: to("rewind"),
  k: hyper("k", "Toggle Keycastr"),
};
