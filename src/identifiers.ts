import { Conditions } from "./types";

export const SILICONE_MAC_ID = { is_keyboard: true };

export const INTEL_MAC_ID = {
  is_keyboard: true,
  product_id: 632,
  vendor_id: 1452,
};

export const isNotIntelCondition: Conditions[] = [
  {
    type: "device_unless",
    identifiers: [INTEL_MAC_ID],
  },
];

export const isIntelCondition: Conditions[] = [
  {
    type: "device_if",
    identifiers: [INTEL_MAC_ID],
  },
];
