import { capsControl } from "../rules/capsControl";
import { capsLayers } from "../rules/capsLayers";
import { chords } from "../rules/chords";
import { commandCommand } from "../rules/commandCommmand";
import {
  colemakModDH as colemakModDHSimple,
  INTEL_MAC_ID,
  SILICONE_MAC_ID,
} from "../simpleModifications";
import { Profile } from "../types";

export const colemakModDH: Profile = {
  name: "Colemak Mod DH",
  selected: true,
  virtual_hid_keyboard: {
    keyboard_type_v2: "ansi",
  },
  complex_modifications: {
    rules: [capsControl, commandCommand, capsLayers, chords].flat(),
  },
  devices: [
    {
      identifiers: INTEL_MAC_ID,
      simple_modifications: colemakModDHSimple,
    },
    {
      identifiers: SILICONE_MAC_ID,
      simple_modifications: colemakModDHSimple,
    },
  ],
};
