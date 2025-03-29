import { capsLayers } from "../rules/capsLayers";
import { Profile } from "../types";

export const mxstbr: Profile = {
  name: "mxstbr",
  selected: false,
  virtual_hid_keyboard: {
    keyboard_type_v2: "ansi",
  },
  complex_modifications: {
    rules: capsLayers,
  },
};
