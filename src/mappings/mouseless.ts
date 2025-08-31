import { Mapping } from "../utils";

const mouselessClick = {
  description: "Mouseless.app click shortcut",
  toKey: "f14",
} satisfies Mapping;

const mouselessScroll = {
  description: "Mouseless.app scroll shortcut",
  toKey: "f15",
} satisfies Mapping;

export const mouseless = {
  click: mouselessClick,
  scroll: mouselessScroll,
};
