import { Mapping } from "../utils";

const iceSearch = {
  description: "Trigger ice bar search",
  toKey: "f18",
  toModifiers: ["left_command"],
} satisfies Mapping;

export const ice = {
  search: iceSearch
}
