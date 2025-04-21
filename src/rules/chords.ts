import { isBuiltInCondition } from "../conditions";
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
    remap(["s", "e"], homeRowAppClick),
    remap(["t", "n"], homeRowAppScroll),
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
