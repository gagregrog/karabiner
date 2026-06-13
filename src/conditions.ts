import { Condition } from "./types";

export const isBuiltInCondition: Condition[] = [
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
