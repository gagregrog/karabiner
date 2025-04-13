import { LayerKeySublayer, open } from "../../utils";

/**
 * Assortment of raycast shortcuts
 */
export const raycastLayer: LayerKeySublayer = {
  y: open("raycast://confetti"),
  c: open("raycast://extensions/thomas/color-picker/pick-color"),
  n: open("raycast://script-commands/dismiss-notifications"),
  f: open("raycast://script-commands/copy-focused-finder-window-path"),
  j: open("raycast://script-commands/decode-jwt"),
  a: open("raycast://script-commands/view-scripting-dictionary"),
  m: open("raycast://script-commands/toggle-mic"),
  e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
};
