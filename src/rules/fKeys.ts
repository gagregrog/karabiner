import { homeRowAppClick, homeRowAppScroll } from "./mappings";
import { Rule } from "../types";
import { remap, withConditions } from "../utils";
import { isIntelCondition, isNotIntelCondition } from "../conditions";

export const fKeys: Rule = {
  description: "Make f keys do cool things",
  manipulators: [
    // these fKey rules don't get triggered by other manipulators
    withConditions(remap("f23", homeRowAppClick), isIntelCondition),
    withConditions(remap("f24", homeRowAppScroll), isIntelCondition),
    withConditions(remap("f23", { toKey: "f19" }), isNotIntelCondition), // used for Mouseless click
    withConditions(remap("f24", { toKey: "f20" }), isNotIntelCondition), // used for Mouseless scroll
    withConditions(
      remap("f22", { toKey: "f18", toModifiers: ["left_command"] }), // used to trigger Ice search
      isNotIntelCondition // **Ice not supported on intel**
    ),
  ],
};
