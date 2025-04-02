import { capsControl } from "../rules/capsControl";
import { capsLayers } from "../rules/capsLayers";
import { commandCommand } from "../rules/commandCommmand";
import {
  colemakModDH as colemakModDHSimple,
  MAC_ID,
} from "../simpleModifications";
import { Profile } from "../types";

export const colemakModDH: Profile = {
  name: "Colemak Mod DH",
  selected: true,
  virtual_hid_keyboard: {
    keyboard_type_v2: "ansi",
  },
  complex_modifications: {
    rules: [capsControl, commandCommand, ...capsLayers],
  },
  devices: [
    {
      identifiers: MAC_ID,
      simple_modifications: colemakModDHSimple,
    },
  ],
};
