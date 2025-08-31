import { Mapping } from "../utils";

const homeRowAppClick = {
  description: "Homerow.app click shortcut",
  toKey: "delete_or_backspace",
  toModifiers: ["left_shift", "left_command", "left_alt"],
} satisfies Mapping;

const homeRowAppScroll = {
  description: "Homerow.app scroll shortcut",
  toKey: "delete_or_backspace",
  toModifiers: ["left_shift", "left_command"],
} satisfies Mapping;

export const homeRowApp = {
  click: homeRowAppClick,
  scroll: homeRowAppScroll,
};
