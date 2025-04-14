import { INTEL_MAC_ID } from "./identifiers";
import { Conditions } from "./types";

export const isNotIntelCondition: Conditions[] = [
  {
    type: "device_exists_unless",
    identifiers: [INTEL_MAC_ID],
  },
];

export const isIntelCondition: Conditions[] = [
  {
    type: "device_exists_if",
    identifiers: [INTEL_MAC_ID],
  },
];

export const isbuiltInCondition: Conditions[] = [
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
