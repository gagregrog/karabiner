import { capsControl } from "../rules/capsControl";
import { spaceLayers } from "../rules/spaceLayers";
import { chords } from "../rules/chords";
import { commandCommand } from "../rules/commandCommmand";
import { colemakModDH as colemakModDHSimple } from "../simpleModifications";
import { Profile } from "../types";
import { INTEL_MAC_ID, SILICONE_MAC_ID } from "../identifiers";

export const colemakModDH: Profile = {
  name: "Colemak Mod DH",
  selected: true,
  virtual_hid_keyboard: {
    keyboard_type_v2: "ansi",
  },
  complex_modifications: {
    rules: [commandCommand, spaceLayers, chords, capsControl].flat(),
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
