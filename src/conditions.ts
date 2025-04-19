import { INTEL_MAC_ID } from "./identifiers";
import { Condition } from "./types";

export const isNotIntelCondition: Condition[] = [
  {
    type: "device_exists_unless",
    identifiers: [INTEL_MAC_ID],
  },
];

export const isIntelCondition: Condition[] = [
  {
    type: "device_exists_if",
    identifiers: [INTEL_MAC_ID],
  },
];

export const isbuiltInCondition: Condition[] = [
  {
    type: "device_if",
    identifiers: [
      {
        is_keyboard: true,
        is_built_in_keyboard: true,
      },
    ],
  },
];
