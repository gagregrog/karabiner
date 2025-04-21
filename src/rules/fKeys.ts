import { homeRowAppClick, homeRowAppScroll } from "./mappings";
import { Rule } from "../types";
import { remap } from "../utils";

export const fKeys: Rule = {
  description: "Make f keys do cool things",
  manipulators: [
    // these fKey rules don't get triggered by other manipulators
    remap("f23", homeRowAppClick),
    remap("f24", homeRowAppScroll),
  ],
};
