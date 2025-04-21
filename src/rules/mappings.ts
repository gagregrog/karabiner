import { Mapping } from "../utils";

export const homeRowAppClick: Mapping = {
  description: "Homerow.app click shortcut",
  toKey: "delete_or_backspace",
  toModifiers: ["left_shift", "left_command", "left_alt"],
};

export const homeRowAppScroll: Mapping = {
  description: "Homerow.app scroll shortcut",
  toKey: "delete_or_backspace",
  toModifiers: ["left_shift", "left_command"],
};
