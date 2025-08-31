import { Rule } from "../types";
import { remap, withConditions } from "../utils";
import { isNotIntelCondition } from "../conditions";

export const fKeys: Rule = {
  description: "Make f keys do cool things",
  manipulators: [
    remap("f23", { toKey: "f19" }), // used for Mouseless click
    remap("f24", { toKey: "f20" }), // used for Mouseless scroll
    withConditions(
      remap("f22", { toKey: "f18", toModifiers: ["left_command"] }), // used to trigger Ice search
      isNotIntelCondition // **Ice not supported on intel**
    ),
  ],
};
