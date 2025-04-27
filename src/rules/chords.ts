import {
  isBuiltInCondition,
  isIntelCondition,
  isNotIntelCondition,
} from "../conditions";
import { homeRowAppClick, homeRowAppScroll } from "./mappings";
import { KeyCode, Manipulator, ModifierKey, Rule } from "../types";
import { remap, withConditions } from "../utils";

export const chords: Rule = {
  description: "Chords for built in keyboard only",
  manipulators: [
    makeChord(["n", "e"], "right_shift"),
    makeChord(["e", "i"], "right_command"),
    makeChord(["l", "u"], "right_alt"),
    makeChord(["u", "y"], "right_control"),
    makeChord(["s", "t"], "left_shift"),
    makeChord(["s", "r"], "left_command"),
    makeChord(["f", "p"], "left_alt"),
    makeChord(["w", "f"], "left_control"),
    makeChord(["h", "comma"], "right_command", ["right_shift"]),
    makeChord(["c", "d"], "left_command", ["left_shift"]),
    makeChord(["comma", "period"], "right_command", ["right_option"]),
    makeChord(["x", "c"], "left_command", ["left_option"]),
    withConditions(remap(["t", "n"], homeRowAppClick), isIntelCondition),
    withConditions(remap(["t", "n"], homeRowAppScroll), isIntelCondition),
    withConditions(
      makeChord(["s", "e"], "f19"), // used to trigger Mouseless click
      isNotIntelCondition // **not yet supported on intel**
    ),
    withConditions(
      makeChord(["t", "n"], "f20"), // used to trigger Mouseless scrolling
      isNotIntelCondition // **not yet supported on intel**
    ),
    withConditions(
      makeChord(["r", "i"], "f18", ["left_command"]), // used to trigger Ice search
      isNotIntelCondition // **Ice not supported on intel**
    ),
  ].map((manipulator) => withConditions(manipulator, isBuiltInCondition)),
};

function makeChord(
  fromKeys: KeyCode[],
  toKey: KeyCode,
  toModifiers: ModifierKey[] = []
): Manipulator {
  return remap(fromKeys, {
    toKey,
    toModifiers,
  });
}
