import { capsControl } from "../rules/capsControl";
import { commandCommand } from "../rules/commandCommmand";
import { colemakModDH } from "../simpleModifications";
import { Profile } from "../types";

export const ColemakModDH: Profile = {
  name: "Colemak Mod DH",
  selected: true,
  virtual_hid_keyboard: {
    keyboard_type_v2: "ansi",
  },
  complex_modifications: {
    rules: [capsControl, commandCommand],
  },
  devices: [
    {
      identifiers: { is_built_in_keyboard: true },
      simple_modifications: colemakModDH,
    },
  ],
};
