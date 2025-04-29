import { LayerKeySublayer, open } from "../../utils";

/**
 * Assortment of raycast shortcuts
 */
export const raycastLayer: LayerKeySublayer = {
  y: open("raycast://confetti"),
  c: open("raycast://extensions/thomas/color-picker/pick-color"),
  f: open("raycast://script-commands/copy-focused-finder-window-path"),
  j: open("raycast://script-commands/decode-jwt"),
  m: open(
    // first argument is for speakers, second is for mic
    // double quoting is required for the second arument to pass through the shell_command
    "'raycast://script-commands/audio-device-manager?arguments=LG&arguments=Yeti'"
  ),
  a: open("raycast://script-commands/view-scripting-dictionary"),
  e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
};
