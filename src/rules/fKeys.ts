import { Rule } from "../types";
import { remap } from "../utils";
import { QMK } from "../mappings/inputs/qmk";
import { mouseless } from "../mappings/mouseless";
import { ice } from "../mappings/ice";
import { appleSiliconOnly } from "../machine";

export const fKeys: Rule = {
  description: "Make f keys do cool things",
  manipulators: [
    remap(QMK.chords.command, mouseless.click),
    remap(QMK.chords.shift, mouseless.scroll),
    ...appleSiliconOnly([remap(QMK.chords.alt, ice.search)]),
  ],
};
